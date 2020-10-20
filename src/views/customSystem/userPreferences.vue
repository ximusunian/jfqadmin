<!--
 * @Description: 用户系统 -> 用户参数
 * @version: 
 * @Author: ximusunian
 * @Date: 2020-10-16 16:47:08
 * @LastEditors: ximusunian
 * @LastEditTime: 2020-10-16 17:20:31
-->
<template>
  <div id="userPreferences">
    <div class="box">
      <el-form ref="form" :model="form" label-width="120px">
        <div class="title">基本参数：</div>
        <el-form-item label="注册新用户" size="medium">
          <el-switch
            v-model="form.isAllowRegister"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="允许注册（是）"
            inactive-text="允许注册（否）"
          >
          </el-switch>
          <span class="tips"
            >关闭以后新用户将无法注册</span
          >
        </el-form-item>
        <el-form-item label="新用户审核	" size="medium">
          <el-switch
            v-model="form.isNewUserAudit"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="自动审核（是）"
            inactive-text="自动审核（否）"
          >
          </el-switch>
          <span class="tips"
            >设为管理员审核表示用户注册成功后需要等待审核才能正常使用</span
          >
        </el-form-item>
        <el-form-item label="邀请码收徒" size="medium">
          <el-switch
            v-model="form.isPopup"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="弹框收徒（是）"
            inactive-text="弹框收徒（否）"
          >
          </el-switch>
          <span class="tips"
            >注册登录后是否弹框填写邀请码收徒</span
          >
        </el-form-item>
        <el-form-item label="越狱机注册" size="medium">
          <el-switch
            v-model="form.isAllowOtherRegister"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="允许注册（是）"
            inactive-text="允许注册（否）"
          >
          </el-switch>
          <span class="tips"
            >是否允许越狱机注册系统</span
          >
        </el-form-item>
        <el-form-item label="SIM卡检测" size="medium">
          <el-switch
            v-model="form.checkSIM"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="允许做任务（是）"
            inactive-text="允许做任务（否）"
          >
          </el-switch>
          <span class="tips"
            >是否允许无SIM卡做任务</span
          >
        </el-form-item>
        <el-form-item label="IDFA修改" size="medium">
          <el-input
            v-model="form.idfa"
            placeholder="限制IDFA的修改次数(为空表示不限制)"
          ></el-input>
        </el-form-item>
        <el-form-item label="黑名单地址">
          <el-input
            type="textarea"
            v-model="form.blacklist"
            placeholder="禁止以上IP地址登录系统,不同IP之间用“|”分开"
          ></el-input>
        </el-form-item>
        <el-form-item label="收徒规则">
          <el-input
            type="textarea"
            v-model="form.enlighteningRules"
            placeholder="编写收徒规则,换行直接用回车键"
          ></el-input>
        </el-form-item>

        <el-divider></el-divider>

        <div class="title">其他参数：</div>
        <el-form-item label="支付宝重复" size="medium">
          <el-switch
            v-model="form.isAllowAlipayRepeat"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="允许重复（是）"
            inactive-text="允许重复（否）"
          >
          </el-switch>
          <span class="tips"
            >允许后表示同支付宝可绑定多个账号</span
          >
        </el-form-item>
        <el-form-item label="手机号重复" size="medium">
          <el-switch
            v-model="form.isAllowPhoneRepeat"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="允许重复（是）"
            inactive-text="允许重复（否）"
          >
          </el-switch>
          <span class="tips"
            >允许后表示同手机号可绑定多个账号</span
          >
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "userPreferences",
  data() {
    return {
      form: {
        isAllowRegister: true,                  // 是否允许注册新用户
        isNewUserAudit: true,                   // 设为管理员审核表示用户注册成功后需要等待审核才能正常使用
        isPopup: true,                          // 注册登录后是否弹框填写邀请码收徒
        isAllowOtherRegister: true,             // 是否允许越狱机注册系统
        checkSIM: true,                         // 是否允许无SIM卡做任务
        idfa: '',                               // idfa修改次数
        blacklist: '',                          // 黑名单
        enlighteningRules: '',                  // 收徒规则 
        isAllowAlipayRepeat: false,             // 是否允许支付宝重复
        isAllowPhoneRepeat: false,              // 是否允许手机号重复
      }
    };
  },
  components: {},
  watch: {},
  mounted() {},
  methods: {
    onSubmit() {
      
    }
  },
};
</script>

<style scoped lang="scss">
#userPreferences {
   padding: 2rem;
  .box {
    padding: 2rem;
    background: #fff;
    border: 1px solid #dcdfe6;
    -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
      0 0 6px 0 rgba(0, 0, 0, 0.04);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  }
  .title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  .tips {
    float: right;
    color: #aaaaaa;
  }
}
</style>
