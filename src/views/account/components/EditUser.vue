<template>
  <div>
    <el-dialog title="用户信息编辑" :visible.sync="isChildShowUserDialog">
      <el-form ref="userInfo" :model="userInfo" :rules="rules" label-width="80px">
        <el-form-item label="姓" prop="name">
          <el-input v-model="userInfo.name" auto-complete="off" placeholder="必填" />
        </el-form-item>
        <el-form-item label="名" prop="surname">
          <el-input v-model="userInfo.surname" auto-complete="off" placeholder="必填" />
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userInfo.userName" auto-complete="off" placeholder="只能包含字母或数字" />
        </el-form-item>
        <el-form-item v-if="ruleForm.isNewUser" label="密码" prop="password">
          <el-input v-model="userInfo.password" type="password" auto-complete="off" placeholder="只能包含字母或数字" />
        </el-form-item>
        <el-form-item label="邮箱" prop="emailAddress">
          <el-input v-model="userInfo.emailAddress" auto-complete="off" placeholder="必填" />
        </el-form-item>
        <el-form-item label="所属部门" prop="deptIds">
          <MutiDepartment v-model="userInfo.deptIds" :success="departmentChange" :visible.sync="departmentSelectVisible" :collapsetags="true" :myclass="'width220'" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="text-center">
        <el-button @click="isChildShowUserDialog = false">取 消</el-button>
        <el-button type="primary" @click="configAddUser(userInfo,'userInfo')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { showNotification } from '../../../utils/index.js'
import { addUser, upduser } from '../../../api/user.js';
import MutiDepartment from '@/components/ComboBox/MutiDepartment'

export default {
  components: {
    MutiDepartment,
  },
  props: {
    ruleForm: {},
    isPartentShowUserDialog: false
  },
  data() {
    return {
      isChildShowUserDialog: false,
      formLabelWidth: '80px',
      userInfo: {},
      rules: {
        name: [{
          required: true,
          message: '请输入姓氏',
          trigger: 'blur'
        }],
        surname: [{
          required: true,
          message: '请输入名字',
          trigger: 'blur'
        }],
        userName: [{
          required: true,
          message: '请输入用户名,只能包含字母或数字',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码,只能包含字母或数字',
          trigger: 'blur'
        }],
        emailAddress: [{
          required: true,
          message: '请输入邮箱地址',
          trigger: 'blur'
        },
        {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: ['blur', 'change']
        }
        ]
      },
      departmentSelectVisible: false,
    };
  },
  watch: {
    isPartentShowUserDialog: {
      handler(newValue, oldValue) {
        this.isChildShowUserDialog = true
        if (!this.ruleForm.isNewUser) {
          this.userInfo = this.ruleForm
        } else {
          this.userInfo = {}
        }
      },
      immediate: false
    }
  },
  methods: {
    configAddUser(userData, formName) { 
      this.$refs[formName].validate(valid => { 
        if (valid) {
          if (this.ruleForm.isNewUser) {
            this.postNewUserData(userData)
          } else {
            this.postModifyUserData(userData)
          }
        }
      })
    },
    // 新增用户
    postNewUserData(userData) {

      addUser(userData).then((res) => { 
        if (res.success) {
          this.postSuccess("添加成功")
        } else {
          showNotification(this, res.message, '')
        }
      })
    },
    // 修改用户信息
    postModifyUserData(userData) { 
      upduser(userData).then((res) => { 
        if (res.result.success) {
          this.postSuccess('修改成功！')
        }
        else{
          showNotification(this, res.message, '')
        }
      })
    },
    // 数据请求成功后提示
    postSuccess(title) {
      this.isChildShowUserDialog = false
      this.$emit('isAddUserSuccess', true)
      showNotification(this, title, '')
    },
    // 部门多选
    departmentChange(val) {  
      this.userInfo.deptIds = val;
    },
  }
}

</script>

<style>
  .slider-list {
    padding: 10px;
    color: #d6d6d6 !important;
    background-color: rgb(53, 53, 53) !important;
  }

  .slider-list div {
    line-height: 40px;
  }

  .el-tree-node__content {
    margin: 10px;
  }

  .el-tree-node__label {
    font-size: 16px;
  }

</style>
