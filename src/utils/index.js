import request from '@/utils/request'
/**
 * Parse the time to string 将时间戳/日期转为日期字符串
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  if (isEmpty(time)) {
    return time;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}
 
 

export function isEmpty(value) {
  if (value === '' || value === undefined || value === null) {
    return true
  } else {
    return false
  }
}
export function strNone(value) {
  if (value === '' || value === undefined || value === null) {
    return true
  } else {
    return value.trim().length === 0;
  }
}
// 格式化日期，如：yyyy-MM-dd
export function formatTime(curTime, formatType) {
  var o = {
    'M+': curTime.getMonth() + 1, // month
    'd+': curTime.getDate(), // day
    'h+': curTime.getHours(), // hour
    'm+': curTime.getMinutes(), // minute
    's+': curTime.getSeconds(), // second
    'q+': Math.floor((curTime.getMonth() + 3) / 3), // quarter
    'S': curTime.getMilliseconds() // millisecond
  }
  if (/(y+)/.test(formatType)) {
    formatType = formatType.replace(RegExp.$1, (curTime.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(formatType)) {
      formatType = formatType.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k])
        .length))
    }
  }
  return formatType
}
// 判断是否超过1天
export function checkDateOutOf(that, selectTime, callback) {
  //const timeDiff = (new Date() - selectTime) / (1000 * 60 * 60 * 24)
  // if (timeDiff < 1) {
  //   showNotification(that, '只能获取昨天以前的数据，请重新选择日期', '')
  //   callback(false)
  // } else {
  //   callback(true)
  // }

  var todayStr = dateToString(new Date()); 
    var today = stringToDate(todayStr);
    var targetStr = dateToString(selectTime);
    var target = stringToDate(targetStr);
    let timeDiff = (today - target)/(1000 * 60 * 60 * 24);
    if (timeDiff < 1) {
      showNotification(that, "只能获取今天以前的数据，请重新选择日期", "");
      callback(false);
    } else {
      callback(true);
    }
} 
export function dateToString(date){ 
  var year = date.getFullYear(); 
  var month =(date.getMonth() + 1).toString(); 
  var day = (date.getDate()).toString();  
  if (month.length == 1) { 
      month = "0" + month; 
  } 
  if (day.length == 1) { 
      day = "0" + day; 
  }
  var dateTime = year + "-" + month + "-" + day;
  return dateTime; 
}
export function stringToDate(dateStr,separator){
  if(!separator){
         separator="-";
  }
  var dateArr = dateStr.split(separator);
  var year = parseInt(dateArr[0]);
  var month;                     
  if(dateArr[1].indexOf("0") == 0){
      month = parseInt(dateArr[1].substring(1));
  }else{
       month = parseInt(dateArr[1]);
  }
  var day = parseInt(dateArr[2]);
  var date = new Date(year,month -1,day);
  return date;
}

export function warn(that, msg) {
  that.$message({
    message: msg,
    type: 'warning'
  });
}
export function error(that, msg) {
  that.$message.error(msg);
}
export function successMsg(that,msg){
   that.$message({
          message: msg,
          type: 'success'
        });
}
/**
*判断是否是数字
*
**/

export function isRealNum(val) {
  var reg = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 ，判断正整数用/^[1-9]+[0-9]*]*$/
  if (!reg.test(val)) {
    return false;
  }
  return true;
}
export function showNotification(that, title, content) {
  that.$notify({
    title: title,
    message: that.$createElement('i', {
      style: 'color: teal'
    }, content)
  })
}
// 获取当月天数
export function getMonthLength(date) {
  const d = new Date(date)
  // 将日期设置为下月一号
  d.setMonth(d.getMonth() + 1)
  d.setDate('1')
  // 获取本月最后一天
  d.setDate(d.getDate() - 1)
  return d.getDate()
}
// 本月第一天
export function getCurMonthFirst() {
  var nowdays = new Date();
  var year = nowdays.getFullYear();
  var month = nowdays.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  var firstDay = year + "-" + month + "-" + "01";//本月的第一天

  return firstDay;
}
// 本月最后一天
export function getCurMonthLast() {
  var nowdays = new Date();
  var year = nowdays.getFullYear();
  var month = nowdays.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  var myDate = new Date(year, month, 0);
  var lastDay = year + "-" + month + "-" + myDate.getDate();//上个月的最后一天

  return lastDay
}
// 上个月第一天
export function getLastMonthFirst() {
  var nowdays = new Date();
  var year = nowdays.getFullYear();
  var month = nowdays.getMonth();
  if (month == 0) {
    month = 12;
    year = year - 1;
  }
  if (month < 10) {
    month = "0" + month;
  }
  var firstDay = year + "-" + month + "-" + "01";//上个月的第一天

  return firstDay;
}
// 上个月最后一天
export function getLastMonthLast() {
  var nowdays = new Date();
  var year = nowdays.getFullYear();
  var month = nowdays.getMonth();
  if (month == 0) {
    month = 12;
    year = year - 1;
  }
  if (month < 10) {
    month = "0" + month;
  }
  var myDate = new Date(year, month, 0);
  var lastDay = year + "-" + month + "-" + myDate.getDate();//上个月的最后一天

  return lastDay
}
// 两日期相差天数
export function timeDiffDay(date1, date2, contain = true) {
  //date1:小日期   date2:大日期
  var sdate = new Date(date1);
  var now = new Date(date2);
  var days = now.getTime() - sdate.getTime();
  var day = parseInt(days / (1000 * 60 * 60 * 24));
  if(contain) {
    return day + 1;
  } else {
    return day;
  }
} 
// 昨天、前天、几天前
// export function getDateStr(AddDayCount) {
//   var addDay = AddDayCount * (24*60*60*1000);
//   var time = (new Date()).getTime() + addDay;
//   var dd = new Date(time);
//   var y = dd.getFullYear();
//   var m = dd.getMonth() + 1;//获取当前月份的日期
//   var d = dd.getDate();
//   return y + '-' + (m < 10 ? m : ('0' + m)) + '-' + (d < 10 ? d : ('0' + d));
// }
export function getDateStr(AddDayCount) {
  var dd = new Date();
  dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1;//获取当前月份的日期
  var d = dd.getDate();
  return y + '-' + (m >= 10 ? m : ('0' + m)) + '-' + (d >= 10 ? d : ('0' + d));
}

// 下载Excel表格
export function getFileData(that,exportname, urlInfo,input, callback) {
  request({
    url: urlInfo,
    method: "get",
    responseType:'blob',
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
    params: input
  })
  .then(response => { 
    if (!isEmpty(response)) {
      downloadFile(response, exportname, "xlsx");
      callback(response);
    }
  })
  .catch(res => {
    if (!isEmpty(res)) {
      showNotification(that, res.error.message, "");
    }
    callback(res.response);
  });
} 
export function postFileData(that, exportname, url, postdata, callback) { 
  request({
     url: url,
     method: "post",
     responseType:'blob',
     headers: {
      "Content-type": "application/json",
     },
     data: postdata
   }).then(response => { 
     if (!isEmpty(response)) {
       downloadFile(response, exportname, "xlsx");
       callback(response);
     }
   })
   .catch(res => {
     if (!isEmpty(res)) {
       showNotification(that,res.error.message, "");
     }
     callback(res.response);
   });;
}
// 导出
export function downloadFile(downname, exportname, format) { 
  //const blob = new Blob([downname], { type: 'application/vnd.ms-excel;' })
  const blob = new Blob([downname]);
  const fileName = exportname + parseTime(new Date(), "{y}{m}{d}{h}{i}{s}") + "." + format;
  if ('download' in document.createElement('a')) { // 非IE下载
    const elink = document.createElement('a');
    elink.download = fileName;
    elink.style.display = 'none';
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href); // 释放URL 对象
    document.body.removeChild(elink);
  } else { // IE10+下载
    navigator.msSaveBlob(blob, fileName);
  }
}
// 枚举解析
export function enumValueLabelFormat(type, typeList) {
  if(isEmpty(typeList))
    return '';
  var typeKeyValue = typeList.reduce((acc, cur) => {
    acc[cur.value] = cur.label;
    return acc;
  }, {});
  return typeKeyValue[type];
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

export function getCurrentMonthFirstDay(){
  let d = new Date(); 
  return getFirstDay(d);
}
export function getCurrentMonthLastDay(){
  let d = new Date();
  return getLastDay(d);
}

export function getFirstDay(date) { 
  //获取当前时间
  let d = new Date(date);
  //获取当前月的第一天 
  let monthStart = formatTime(new Date(d.getFullYear(), d.getMonth(), 1),"yyyy-MM-dd");
  return monthStart;
} 
export function getLastDay(date) {
  //获取当前时间
  let d = new Date(date);
  //获取到本月最后一天
  let monthEnd = formatTime(new Date(d.getFullYear(), d.getMonth(), getMonthLength(date)),"yyyy-MM-dd");

  return monthEnd;
}
const pickerOptions = {
  shortcuts: [
    {
      text: "最近一周",
      onClick(picker) {
        const end = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit("pick", [start, end]);
      }
    },
    {
      text: "最近一个月",
      onClick(picker) {
        const end = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        picker.$emit("pick", [start, end]);
      }
    },
    {
      text: "最近三个月",
      onClick(picker) {
        const end = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        picker.$emit("pick", [start, end]);
      }
    }
  ]
};
export { pickerOptions }