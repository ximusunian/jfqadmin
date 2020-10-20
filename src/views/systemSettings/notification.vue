<!--
 * @Description: 消息推送
 * @version: 
 * @Author: ximusunian
 * @Date: 2020-10-16 17:26:50
 * @LastEditors: ximusunian
 * @LastEditTime: 2020-10-16 17:36:12
-->
<template>
  <div id="notification">
    <div class="box">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="对接账号" size="medium">
          <el-input
            v-model="form.jointAccount"
            placeholder="iOS消息推送系统对接帐号appId"
          ></el-input>
        </el-form-item>
        <el-form-item label="对接令牌" size="medium">
          <el-input
            v-model="form.jointToken"
            placeholder="iOS消息推送系统应用appsecret"
          ></el-input>
        </el-form-item>
        <el-form-item label="推送模板" size="medium">
          <el-input
            v-model="form.pushTemplate"
            placeholder="iOS消息推送内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="第三参数" size="medium">
          <el-input
            v-model="form.otherParameter"
            placeholder="对接时需要的第三个接口参数,可无"
          ></el-input>
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
  name: "notification",
  data() {
    return {
      form: {
        jointAccount: '',                  // 对接账号
        jointToken: '',                    // 对接令牌
        pushTemplate: '',                  // 推送模板
        otherParameter: ''                 // 第三参数
      },
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
#notification {
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
