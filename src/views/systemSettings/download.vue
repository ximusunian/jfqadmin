<!--
 * @Description: 应用程序下载配置
 * @version: 
 * @Author: ximusunian
 * @Date: 2020-10-16 09:29:11
 * @LastEditors: ximusunian
 * @LastEditTime: 2020-10-16 14:59:07
-->
<template>
  <div id="download">
    <div class="box">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="应用名称" size="medium">
          <el-input
            v-model="form.name"
            placeholder="iOS APP应用名称,请限制在15个汉字以内"
            maxlength="15"
          ></el-input>
        </el-form-item>
        <el-form-item label="安装地址" size="medium">
          <el-input
            v-model="form.url"
            placeholder="iOS应用在线安装地址，须支持SSL证书"
          ></el-input>
        </el-form-item>
        <el-form-item label="当前版本" size="medium">
          <el-input
            v-model="form.version"
            placeholder="当前系统应用的版本，方便用户更新"
          ></el-input>
        </el-form-item>
        <el-form-item label="占用端口" size="medium">
          <el-input
            v-model="form.port"
            placeholder="当前iOS应用占用本地app端口号"
          ></el-input>
        </el-form-item>
        <el-form-item label="访问协议" size="medium">
          <el-input
            v-model="form.protocol"
            placeholder="iOS系统访问协议"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "download",
  data() {
    return {
      form: {
        name: "",
        url: "",
        version: "",
        date2: "",
        port: "",
        protocol: "",
      },
    };
  },
  components: {},
  watch: {},
  mounted() {},
  methods: {
    onSubmit() {},
  },
};
</script>

<style scoped lang="scss">
#download {
  padding: 2rem;
  .box {
    padding: 2rem;
    background: #fff;
    border: 1px solid #dcdfe6;
    -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
      0 0 6px 0 rgba(0, 0, 0, 0.04);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  }
}
</style>
