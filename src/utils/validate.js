 
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
// export function validUsername(str) {
//   const valid_map = ['admin', 'editor']
//   return valid_map.indexOf(str.trim()) >= 0
// }

/** 
 * 身份证15位编码规则：dddddd yymmdd xx p
 * dddddd：地区码
 * yymmdd: 出生年月日
 * xx: 顺序类编码，无法确定
 * p: 性别，奇数为男，偶数为女
 * <p />
 * 身份证18位编码规则：dddddd yyyymmdd xxx y
 * dddddd：地区码
 * yyyymmdd: 出生年月日
 * xxx:顺序类编码，无法确定，奇数为男，偶数为女
 * y: 校验码，该位数值可通过前17位计算获得
 * <p />
 * 18位号码加权因子为(从右到左) wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2,1 ]
 * 验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]
 * 校验位计算公式：Y_P = mod( ∑(Ai×wi),11 )
 * i为身份证号码从右往左数的 2...18 位; Y_P为校验码所在校验码数组位置
 *
 */
// 加权因子
var wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
// 身份证验证位值.10代表X   
var valideCodeArr = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; 
// 区域ID
var areaMap = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
//错误信息
var status = new Array("", "身份证号码位数不对", "身份证号码出生日期超出范围或含有非法字符", "身份证号码校验错误", "身份证地区非法");
// 男女ID
var sexMap = {0:"女",1:"男"};

export function  numValidate(rule, value, callback) { 
  if(!value)
  {
    callback();
  }
  setTimeout(() => {
    if (!Number.isInteger(+value)) {
      callback(new Error("请输入数字值"));
    }  
  }, 100);
}
export function telValidate(rule, value, callback) {
  const telreg = /^1[3|4|5|6|7|8][0-9]{9}$/;
 
  if(!value)
  {
    callback("请输入电话号码");
  }
  setTimeout(() => {
    if (!Number.isInteger(+value)) {
      callback(new Error("请输入数字值"));
    } else {
      if (telreg.test(value)) {
        callback();
      } else {
        callback(new Error("电话号码格式不正确"));
      }
    }
  }, 100);
}

export function emailValidate(rule, value, callback) {
 
  if(!value)
  {
    callback();
  }
  const emailreg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  setTimeout(() => {
    if (emailreg.test(value)) {
      callback();
    } else {
      callback(new Error("邮箱格式不正确"));
    }
  }, 100);
}


let isNum=(rule, value, callback)=> {
  if(value){
    const pattrn= /^[0-9]*$/
    if (!pattrn.test(value)) {
      callback(new Error('请输入数字'))
    }else{
      callback();
    } 
  }
  else{
    callback();
  }
}
export {isNum}
export function checkIdCardOut(value){ 
   
  if (value === '' || value === undefined || value === null) {
    
    return '请输入身份证号';
  } else if(value.trim().length === 0){ 
    return '请输入身份证号';
  }
  value = trim(value.replace(/ /g, ""));//去掉首尾空格
  
  var msg='';
  if (value.length == 15||value.length == 18) {
      if (!checkArea(value)) {
        msg= status[4];
      } else if(!checkBrith(value)){
        msg= status[2];
      } else if(value.length == 18 && !check18Code(value)){
        msg= status[3];
      } else {
        msg= status[0];
      }
  } else {
      
    msg= status[1];//不是15或者18，位数不对
  }
  return msg;
}
//身份证号判断
export function checkIdCard(rule, value, callback){ 
   
  if (value === '' || value === undefined || value === null) {
    callback(new Error('请输入身份证号'))
    return;
  } else if(value.trim().length === 0){
    callback(new Error('请输入身份证号'))
    return;
  }
  value = trim(value.replace(/ /g, ""));//去掉首尾空格
  
  var msg='';
  if (value.length == 15||value.length == 18) {
      if (!checkArea(value)) {
        msg= status[4];
      } else if(!checkBrith(value)){
        msg= status[2];
      } else if(value.length == 18 && !check18Code(value)){
        msg= status[3];
      } else {
        msg= status[0];
      }
  } else {
      
    msg= status[1];//不是15或者18，位数不对
  }
  if(msg!='')
  {
    callback(new Error(msg))
  }
  else
  {
    callback()
  } 
}
/** 
 * 判断身份证号码为18位时最后的验证位是否正确
 * @param idCardArr 身份证号码数组
 * @return
 */
function check18Code(idCardArr){
  var sum = 0; // 声明加权求和变量
  var tempCardArr = [];  
  for(var i=0;i<idCardArr.length;i++){
    tempCardArr.push(idCardArr[i]);
  }

  if (tempCardArr[17].toLowerCase() == 'x') {
    tempCardArr[17] = '10';// 将最后位为x的验证码替换为10方便后续操作  
  }
  
  for (var i = 0; i < 17; i++) {
      sum += wi[i] * tempCardArr[i];// 加权求和  
  }
  
  var valCodePosition = sum % 11;// 得到验证码所位置
  if (tempCardArr[17] == valideCodeArr[valCodePosition]) {
      return true;
  } else {
      return false;
  }
}
function checkArea(idCard){
  if(areaMap[parseInt(idCard.substr(0, 2))] == null){
      return false;
  } else {
      return true;
  }
}
function getArea(idCard){
  return areaMap[parseInt(idCard.substr(0, 2))];
}
function trim(str){
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
/** 
 * 验证身份证号码中的生日是否是有效生日
 * @param idCard 身份证字符串
 * @return
 */
function checkBrith(idCard){
  var result = true;
  
  if (15 == idCard.length) {
      var year = idCard.substring(6, 8);
      var month = idCard.substring(8, 10);
      var day = idCard.substring(10, 12);
      var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
     
      // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法  
      if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
          result =  false;
      }
  } else if (18 == idCard.length) {
      var year = idCard.substring(6, 10);
      var month = idCard.substring(10, 12);
      var day = idCard.substring(12, 14);
      var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
      
      // 这里用getFullYear()获取年份，避免千年虫问题  
      if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
          result = false;
      }
  } else {
      result = false;
  }
  
  return result;
}
/** 
 * 通过身份证得到性别
 * @param idCard 正确的15/18位身份证号码
 * @return 女、男
 */
function getSex(idCard){
  if (idCard.length == 15) {
      return sexMap[idCard.substring(14, 15) % 2];
  } else if (idCard.length == 18) {
      return sexMap[idCard.substring(14, 17) % 2];
  } else {
      //不是15或者18,null
      return null;
  }
}

/**
* 得到生日"yyyy-mm-dd"
* @param {Object} idCard 正确的15/18位身份证号码
*/
function getBirthday(idCard){
  var birthdayStr;

  if (15 == idCard.length) {
      birthdayStr = idCard.charAt(6) + idCard.charAt(7);
      
      if (parseInt(birthdayStr) < 10) {
          birthdayStr = '20' + birthdayStr;
      } else {
          birthdayStr = '19' + birthdayStr;
      }
      birthdayStr = birthdayStr + '-' + idCard.charAt(8) + idCard.charAt(9) + '-' + idCard.charAt(10) + idCard.charAt(11);
  }else if (18 == idCard.length) {
      birthdayStr = idCard.charAt(6) + idCard.charAt(7) + idCard.charAt(8) + idCard.charAt(9) + '-' + idCard.charAt(10) + idCard.charAt(11) + '-' + idCard.charAt(12) + idCard.charAt(13);
  }
  
  return birthdayStr;
}