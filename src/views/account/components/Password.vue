<template>
  <div>
    <el-dialog title="修改密码" :visible.sync="isShowModifyPw" :close-on-click-modal="false">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="0px">
        <el-form-item prop="oldpassword" v-if="useType===1">
          <el-input v-model="ruleForm.oldpassword" type="password" placeholder="旧密码" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" type="password" placeholder="新密码" />
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input v-model="ruleForm.repassword" type="password" placeholder="确认密码" />
        </el-form-item>
        <el-button type="primary" :loading="configBtn" @click="configPw('ruleForm')">确认</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { showNotification, error } from "../../../utils/index.js";

import { resetpwd } from "../../../api/user.js";

export default {
  props: {
    useType: 0,
    userInfo: {},
    isShowPasswordDialog: false
  },
  data() {
    return {
      configBtn: false,
      isShowModifyPw: false,
      ruleForm: {
        oldpassword: "",
        password: "",
        repassword: ""
      },
      rules: {
        oldpassword: [
          {
            validator: this.oldpasswordValidator,
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur"
          }
        ],
        repassword: [
          {
            required: true,
            message: "确认密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    isShowPasswordDialog: {
      handler(newValue, oldValue) {
        this.isShowModifyPw = true;
      },
      immediate: false
    }
  },
  methods: {
    configPw(formName) {  
      this.$refs[formName].validate(valid => { 
        if (valid) {
          if (this.ruleForm.password != this.ruleForm.repassword) {
            showNotification(this, "两次输入的密码不一致！", "");
            return;
          }
          this.configBtn = true;
          this.putPasswordData();
        } else {
          return false;
        }
      });
    },
    putPasswordData() {
      this.ruleForm.userId = this.userInfo.id;
      this.ruleForm.userType = this.userInfo.userType;
      var data = this.ruleForm;
      var dataInput = {
        id: this.ruleForm.userId,
        password: this.ruleForm.password,
        rePassword: this.ruleForm.repassword,
        userType: this.ruleForm.userType
      }; 
      if (this.useType === 1) {
        dataInput.oldpassword = this.ruleForm.oldpassword;
      }
      resetpwd(dataInput)
        .then(res => {
          if (res.result.code === 50001) {
            error(this, "旧密码填写错误");
            this.configBtn = false;
            return;
          }
          this.configBtn = false;
          this.isShowModifyPw = false;
          this.$emit("isChangePWSuccess", true);
        })
        .catch(err => { 
          showNotification(this, err, "");
        });
    },
    oldpasswordValidator(rule, value, callback) { 
      if (this.useType === 1) {
        if (!value) {
          callback(new Error("请输入旧密码"));
        }
      }
      callback();
    }
  }
};
</script>
<style>
</style>
