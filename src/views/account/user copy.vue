<template>
  <div class="app-container">
    <div class="dis-flex-right">
      <el-row> 
        <Department class="mr10" v-model="inputFilters.deptId" />
        <el-input
          size="mini"
          v-model="inputFilters.searchInfo"
          placeholder="账户名或者姓名"
          style="width:10rem;padding:0px 3px 0px 3px"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        >
        </el-input>  
        <el-button
          class="filter-item"
          type="primary"
          style="margin-left: 10px;"
          size="mini"
          icon="el-icon-search"
          @click="handleFilter"
        >搜索</el-button>
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          size="mini"
          icon="el-icon-edit"
          @click="handleReset"
        >重置</el-button>
      </el-row>
    </div> 
    <el-button :disabled="!permissionList.Users_Admin_List_Add" size="mini" type="primary" @click="modifyUserInfo">新增</el-button>
    <el-button size="mini" type="success" @click="selectPage(inputFilters.pageIndex)">刷新</el-button> 
    
    <el-table max-height="650px" v-loading="isLoading" class="mt10 mb10 border1-e1e1e1" :data="administratorList" border style="text-align: left;"> 
      <el-table-column label="创建日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.creationTime |dateFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账户名" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
       <el-table-column label="用户名" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.name + scope.row.surname}}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="240">
        <template slot-scope="scope">
          <span>{{ scope.row.emailAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column label="功能权限">
        <template slot-scope="scope">
          <span v-for="(item, index) in scope.row.role" :key="index" class="ml6 mr6">{{ item.displayName }}</span>
        </template>
      </el-table-column>
       <el-table-column label="数据权限">
        <template slot-scope="scope">
          <span v-for="(item, index) in scope.row.dataRoleNames" :key="index" class="ml6 mr6">{{ item }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="450">
        <template slot-scope="scope">
          <el-button :disabled="!permissionList.Users_Admin_List_UpdRole" size="mini" type="primary" @click="showAuthrizeDialog(scope.$index, scope.row)">功能权限</el-button>
          <el-button :disabled="!permissionList.Users_Admin_List_UpdRole" size="mini" type="primary" @click="showDataRoleDialog(scope.$index, scope.row)">数据权限</el-button>
          <el-button :disabled="!permissionList.Users_Admin_List_Upd" size="mini" type="primary" @click="modifyUserInfo(scope.$index,scope.row)">修改</el-button>
          <el-button :disabled="!permissionList.Users_Admin_List_MdfPwd" size="mini" type="success" @click="modifyPassword(scope.$index,scope.row)">修改密码</el-button>
          <el-button :disabled="!permissionList.Users_Admin_List_Del" size="mini" type="danger" @click="deleteUser(scope.$index, scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination background layout="prev, pager, next" :current-page="curPage" :page-size="perPage" :total="totalCount"
      @current-change="selectPage" /> -->

    <Pagination v-show="totalCount>0" :total="totalCount" :page.sync="inputFilters.pageIndex" :limit.sync="inputFilters.pageSize" @pagination="selectPage" />

    <el-dialog title="修改功能权限"  :visible.sync="isShowAuthrizeDialog">
      <el-select v-model="curAuthorizationList" multiple placeholder="请选择用户组权限" :change="selectAuthrizationType(curAuthorizationList)">
        <el-option v-for="item in userAuthorizationList" :key="item.id" :label="item.label" :value="item.value" />
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="configModifyAuthrizaiton">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改数据权限"  :visible.sync="isShowDataRoleDialog">
      <el-select v-model="curDataRoleList" multiple placeholder="请选择用户数据权限">
        <el-option v-for="item in allDataRoleList" :key="item.id" :label="item.displayName" :value="item.id" />
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDataRoleDialog = false">取 消</el-button>
        <el-button type="primary" v-loading='dataroleuploadloading' @click="updateUserDataRole()">确 定</el-button>
      </div>
    </el-dialog>

    <Password :use-type="0" :user-info="curUserInfo" :is-show-password-dialog="isShowPasswordDialog" @isChangePWSuccess="resetpwdres"/>
    <DialogBase :dialog-info="dialogInfo" @confirmHandle="confirmHandle" />
    <EditUser :is-new-user="curUserInfo.NewUser"
    :is-partent-show-user-dialog="isShowUserDialog" @isAddUserSuccess="addUserSuccess"
    :rule-form="curUserInfo" />
  </div>
</template>

<script>
  import DialogBase from '../../components/DialogBase/index.vue'
  import Password from './components/Password.vue'
  import EditUser from './components/EditUser.vue'
  import Pagination from "@/components/Pagination";
  import {
    getuserlist,
    deleteuser,
    modifyuserrole
  } from '../../api/user.js'

  import{
    getdatarolebyuser,
    getalldataroles,
    updateuserdatarole
  }from '@/api/datarole.js'

  import {
    getrolebyuser
  } from '../../api/role.js'
  import {
    isEmpty,
    formatTime,
    showNotification
  } from '../../utils/index.js'
  import Department from "@/components/ComboBox/Department";

  // let curPage = 1
  let selectUser = {}
  let selectAuthrizationArr = []
  const defaultUserData = {
    name: '', // 姓
    surname: '', // 名
    userName: '', // 用户名（用于登录的名称，只能包含字母或数字）
    emailAddress: '', // 邮箱
    password: '', // 密码
    isNewUser: true
  }

  export default { 
    components: {
      DialogBase,
      Password,
      EditUser,
      Pagination,
      Department,
    },
    filters: {
      dateFormat(date) {
        return formatTime(new Date(date), 'yyyy-MM-dd hh:mm:ss')
      }
    },
    data() {
      return {
        administratorList: [],
        totalPage: 0,
        totalCount: 0, 
        inputFilters:{
          pageSize: 20,
          pageIndex:1, 
          searchInfo:''
        },
        isShowAuthrizeDialog: false,
        isShowDataRoleDialog:false,
        dataroleuploadloading:false,
        isShowUserDialog: false,
        isShowModifyPw: false,
        isLoading: false,
        isShowPasswordDialog: false,
        passwordForm: '',
        dialogInfo: {},
        curUserInfo: {},
        userAuthorizationList: [],
        curAuthorizationList: [],
        curDataRoleList:[],
        allDataRoleList:[],
        currentRow:{},
        selectAuthrizationList: [],
        permissionList: {}
      }
    },
    created() {
      this.getAdministorlist()
      this.setPermisson();
      this.initData();
    },
    methods: {
      initData(){
         getalldataroles().then(res=>{
           
          this.allDataRoleList = res.result; 
        })
      },
      closeDialog(){
        this.isShowAuthrizeDialog = false; 
      },
      addUserSuccess() {
        this.inputFilters.pageIndex = 1
        this.getAdministorlist()
      },

      // 添加或修改用户信息
      modifyUserInfo(index, userInfo) {
        this.isShowUserDialog = !this.isShowUserDialog;
        if (isEmpty(userInfo)) {
          this.curUserInfo = defaultUserData
        } else {
          this.curUserInfo = userInfo
          this.curUserInfo.isNewUser = false
        }
      },
      // 获取管理员列表
      getAdministorlist() {
        this.isLoading = true  
        getuserlist(this.inputFilters).then((res) => { 
          this.administratorList = res.result.items 
          this.totalPage = res.result.totalPage
          this.totalCount = res.result.totalCount
          this.isLoading = false
        }).catch((err) => {
          this.isLoading = false
        })
      },
      // 选择页码
      selectPage(val) { 
        this.getAdministorlist()
      },
      //显示数据权限编辑弹窗
      showDataRoleDialog(index,row){
        this.currentRow = row;
        selectUser.index = index;
        selectUser.id = row.id;
        this.isShowDataRoleDialog = true; 

        this.curDataRoleList = [];

        if(this.allDataRoleList.length>0){
          //  getdatarolebyuser(row.id).then((res)=>{
          //   if(res.result && res.result.length>0){ 
          //     this.curDataRoleList = res.result.map(item=>{ 
          //       return item.id
          //     }); 
          //   }else{
          //     this.curDataRoleList =[];
          //   } 
          // });
          this.curDataRoleList = row.displayDataRoles.map(item=>{
            return item.id;
          });
        }
        else{
          getalldataroles().then(res=>{
          this.allDataRoleList = res.result; 
        }).then(()=>{ 
          // getdatarolebyuser(row.id).then((res)=>{
          //   if(res.result && res.result.length>0){ 
          //     this.curDataRoleList = res.result.map(item=>{ 
          //       return item.id
          //     }); 
          //   }else{
          //     this.curDataRoleList =[];
          //   }
            
          // });
          this.curDataRoleList = row.displayDataRoles.map(item=>{
            return item.id;
          });
        })
        } 
      }, 
      // 显示用户组编辑弹窗
      showAuthrizeDialog(index, row) {
   
        selectUser.index = index;
        selectUser.id = row.id ;
        this.isShowAuthrizeDialog = true;
        this.curAuthorizationList = row.role.map(item => {
          return item.displayName
        })
        this.getAuthorizeList(row)
      },
      // 获取全部用户组权限列表
      getAuthorizeList(data) {
        getrolebyuser(data).then((res) => { 
          this.userAuthorizationList = res.result.map(item => {
            item.label = item.value = item.displayName
            return item
          })
        })
      },
      // 用户组权限内容发生改变时触发
      selectAuthrizationType(curAuthorizationList) {
        selectAuthrizationArr = []
        selectUser.role = []
        for (let i = 0, len = curAuthorizationList.length; i < len; i++) {
          for (let j = 0, len = this.userAuthorizationList.length; j < len; j++) {
            if (curAuthorizationList[i] === this.userAuthorizationList[j].value) {
              selectAuthrizationArr.push(this.userAuthorizationList[j].id)
              selectUser.role.push(this.userAuthorizationList[j])
            }
          }
        }
      },
      updateUserDataRole(){
        
        this.dataroleuploadloading = true;
        var checkedItems = this.curDataRoleList;
        var userId = selectUser.id;

        var passItems = checkedItems.map(item=>{
          return {userId:userId,dataRoleId:item}
        }); 
        updateuserdatarole({userid:userId},passItems).then((res)=>{
          showNotification(this, res.result, '')

          //更新列表中数据权限显示
          var nameList = [];
          var newDataRols = [];
          this.allDataRoleList.forEach(item=>{
             var itemExist = checkedItems.some(function(a){
               return a==item.id;
             });
             if(itemExist){
               nameList.push(item.displayName);
               newDataRols.push(item);
             }

             
          }) 
          this.currentRow.dataRoleNames = nameList; 
          this.currentRow.displayDataRoles = newDataRols;

          this.dataroleuploadloading = false;
          this.isShowDataRoleDialog = false;
        }).catch(err=>{
          this.dataroleuploadloading = false;
          Console.log(err);
        })
      },
      configModifyAuthrizaiton() { 

        modifyuserrole({
          userIds: [selectUser.id],
          roleIds: selectAuthrizationArr
        }).then((res) => {

          this.isShowAuthrizeDialog = false
          showNotification(this, res.result.result, '')
          this.administratorList[selectUser.index].role = selectUser.role
        }).catch((error)=>{

        })
      },
      deleteUser(index, userInfo) {
        selectUser = userInfo
        selectUser.index = index

        this.dialogInfo = {
          title: '确认操作',
          content: '是否删除该用户？'
        }
      },
      confirmHandle() {
        deleteuser(selectUser.row.id).then((res) => {
          this.administratorList.splice(selectUser.index, 1)
        })
      },
      modifyPassword(index, userData) {
        this.curUserInfo = userData 
        this.isShowPasswordDialog = !this.isShowPasswordDialog
      },
      setPermisson() {
        var arr = this.$store.getters.permissions
        this.permissionList.Users_Admin_List_Add = arr.includes('Users_Admin_List_Add')
        this.permissionList.Users_Admin_List_Upd = arr.includes('Users_Admin_List_Upd')
        this.permissionList.Users_Admin_List_Del = arr.includes('Users_Admin_List_Del')
        this.permissionList.Users_Admin_List_UpdRole = arr.includes('Users_Admin_List_UpdRole')
        this.permissionList.Users_Admin_List_MdfPwd = arr.includes('Users_Admin_List_MdfPwd')
      },
      resetpwdres()
      {
        showNotification(this,"密码修改成功！","");
      },
      handleClose(done)
      {
        this.$confirm('确认关闭？')
                  .then(_ => {
                    done();
                  })
                  .catch(_ => {});
      },
      handleFilter(){
        this.getAdministorlist();
      },
      handleReset(){
        this.inputFilters.searchInfo='';
        this.inputFilters.deptId = '';
      }
    }
  }
</script>

<style>
  .el-main {
    background-color: rgb(255, 255, 255);
    line-height: 40px !important;
  }

  .el-dialog {
    width: 30%;
  }
</style>
