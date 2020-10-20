<template>
  <div class="pl40 pr40" v-loading='isLoading'>
    <p class="mb10 pb15 text-left fs30 "> </p>
    <div class="tab">
      <p class="margin0 mb30 fs12 fg-666666">最近登录{{userInfo.lastLoginTime | dateFormat}}</p>
      <div>
        <el-button class="padding6 height30"
                   type="primary"
                   plain
                   @click="modifyUserInfo">修改资料</el-button>
        <el-button class="ml20 padding6 height30"
                   type="success"
                   plain
                   @click="modifyPassword">修改密码</el-button>
      </div>
    </div>
    <div class="text-left content">
      <!-- <p class="margin0 fg-666666">姓氏</p>
      <p class="margin0 mb20 fs24">{{userInfo.name}}</p> -->

      <p class="margin0 fg-666666">姓名</p>
      <p class="margin0 mb20 fs24">{{userInfo.userName}}</p>

      <p class="margin0 fg-666666">邮箱</p>
      <p class="margin0 mb20 fs24">{{userInfo.emailAddress}}</p>

      <p class="margin0 fg-666666">启用状态</p>
      <i class="mb20 fs18"
         :class="userInfo.isActive? 'el-icon-success fg-07bf7c':'el-icon-error fg-666666'">已启用</i>

      <p class="margin0 fg-666666">用户角色</p>
      <div class="mt10">
        <el-tag class="fs16"
                v-for="(item, index) in userInfo.roleNames"
                :key="index">{{item}}</el-tag>
      </div>
    </div>
    <EditUser :isNewUser="isNewUser"
             :isPartentShowUserDialog="isShowUserDialog"
             :ruleForm="userInfo" />
    <Password :userInfo="userInfo"
              :isShowPasswordDialog="isShowPasswordDialog" /> 
  </div>
</template>

<script> 
import Password from "./components/Password";
import EditUser from "./components/EditUser"; 
import {getSelfInfo} from '@/api/user'
import moment from 'moment'

export default { 
  data() {
    return {
      userInfo: {},
      isShowUserDialog: false,
      isNewUser: false,
      isShowPasswordDialog: false,
      configBtn: false,
      isLoading: false
    };
  },
  components: {
    Password,
    EditUser 
  },
  filters: {
    dateFormat(date) {
        return moment(date).format('YYYY-MM-DD'); 
    }
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      this.isLoading = true; 
    getSelfInfo().then(res=>{ 
        this.userInfo = res.result;
        this.isLoading = false;
    }).catch(err=>{
        this.isLoading = false;
    })
    },
    modifyUserInfo() {
      this.userInfo.userTyep = 1;
      this.isShowUserDialog = !this.isShowUserDialog;
    },
    modifyPassword() {
      this.isShowPasswordDialog = !this.isShowPasswordDialog;
    }
  }
};
</script>

<style scoped>
.tab {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.content p {
  line-height: 26px;
}
</style>
