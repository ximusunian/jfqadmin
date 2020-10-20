<!--
 * @Description: 基础配置
 * @version: 
 * @Author: ximusunian
 * @Date: 2020-10-16 09:30:40
 * @LastEditors: ximusunian
 * @LastEditTime: 2020-10-16 17:15:39
-->
<template>
  <div id="basicSetting">
    <div class="box">
      <el-form ref="baseForm" :model="baseForm" label-width="140px">
        <div class="title">系统基本参数：</div>
        <el-form-item label="系统名称" size="medium">
          <el-input v-model="baseForm.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="系统图标" size="medium">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="网站标题" size="medium">
          <el-input
            v-model="baseForm.title"
            placeholder="好的网站标题有利于搜索引擎优化"
          ></el-input>
        </el-form-item>
        <el-form-item label="网站关键词" size="medium">
          <el-input v-model="baseForm.keywords" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="网站描述" size="medium">
          <el-input
            v-model="baseForm.description"
            placeholder="系统内容描述存放于Descrption区域,利于搜索引擎优化"
          ></el-input>
        </el-form-item>
        <el-form-item label="网站域名" size="medium">
          <el-input v-model="baseForm.domainName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="首页模版" size="medium">
          <el-input
            v-model="baseForm.template"
            placeholder="网站首页模版地址"
          ></el-input>
        </el-form-item>

        <el-divider></el-divider>

        <div class="title">文件上传：</div>
        <el-form-item label="上传文件存放地址" size="medium">
          <el-input
            v-model="baseForm.template"
            placeholder="上传文件保存地址,如UploadFile，文件夹前方不需要带'/'"
          ></el-input>
        </el-form-item>
        <el-form-item label="允许上传文件格式" size="medium">
          <el-input
            v-model="baseForm.template"
            placeholder="文件格式不需要带'.'号,不同文件名请用'|'分割"
          ></el-input>
        </el-form-item>
        <el-form-item label="检测文件木马" size="medium">
          <el-switch
            v-model="baseForm.checkTrojan"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="检查"
            inactive-text="跳过"
          >
          </el-switch>
          <span class="tips"
            >上传文件是否要检测存在的可疑代码,选择是表示检测</span
          >
        </el-form-item>
        <el-form-item label="是否生成缩略图" size="medium">
          <el-switch
            v-model="baseForm.isThumbnail"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
          >
          </el-switch>
          <span class="tips"
            >上传文件是否需要生成缩略图,只支持图片格式文件</span
          >
        </el-form-item>
        <el-form-item label="添加水印" size="medium">
          <el-switch
            v-model="baseForm.isAddWatermark"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
          >
          </el-switch>
          <span class="tips"
            >是否需要为新上传的文件打上水印,只支持图片格式文件</span
          >
        </el-form-item>
        <el-form-item label="水印文字" size="medium">
          <el-input
            v-model="baseForm.watermarkWord"
            placeholder="为图片打上水印的文字"
          ></el-input>
        </el-form-item>

        <el-divider></el-divider>

        <div class="title">邮件参数设置：</div>
        <el-form-item label="邮箱服务器" size="medium">
          <el-input
            v-model="baseForm.server"
            placeholder="发送邮件的邮箱服务器地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" size="medium">
          <el-input
            v-model="baseForm.email"
            placeholder="发送邮件的邮箱地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="登录帐号" size="medium">
          <el-input
            v-model="baseForm.username"
            placeholder="发送邮件的邮箱登录帐号"
          ></el-input>
        </el-form-item>
        <el-form-item label="登录密码" size="medium">
          <el-input
            v-model="baseForm.password"
            placeholder="发送邮件的邮箱地址"
          ></el-input>
        </el-form-item>

        <el-divider></el-divider>

        <div class="title">系统参数设置：</div>
        <el-form-item label="是否开启审核">
          <el-switch
            v-model="baseForm.isOpenAudit"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="过滤马甲包版本">
          <el-input
            type="textarea"
            v-model="baseForm.vestBag"
            placeholder="马甲包版本，多个以“;”号分割"
          ></el-input>
        </el-form-item>
        <el-form-item label="过滤IOS系统版本">
          <el-input
            type="textarea"
            v-model="baseForm.iosVersion"
            placeholder="IOS系统版本，多个以“;”号分割"
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
  name: "basicSetting",
  data() {
    return {
      baseForm: {
        name: "",
        title: "",
        keywords: "",
        description: "",
        domainName: "",
        template: "",
        checkTrojan: false, // 检测文件木马
        isThumbnail: false, // 是否生成缩略图
        isAddWatermark: false, // 是否添加水印
        watermarkWord: "", // 水印文字
        server: "", // 邮箱服务器
        email: "", // 邮箱地址
        username: "", // 登录账号
        password: "", // 登录密码
        isOpenAudit: false, // 是否开启审核
        vestBag: "", // 过滤马甲包版本
        iosVersion: "", // 过滤IOS系统版本
      },
      fileList: [],
    };
  },
  components: {},
  watch: {},
  mounted() {},
  methods: {
    onSubmit() {},
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>

<style scoped lang="scss">
#basicSetting {
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
