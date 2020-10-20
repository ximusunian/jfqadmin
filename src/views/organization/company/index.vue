<template>
  <div class="app-container">
    <div style="float:right;">
      <el-button
        v-if="permissionList.Organization_Company_Upd"
        type="info"
        @click="hisLog"
      >
        异动记录
      </el-button>
    </div>
    <el-form
      ref="form"
      v-loading="loading"
      :model="form"
      :rules="rules"
      style="width:80%;"
      label-width="120px"
      class="view"
    >
      <el-form-item label="公司名称" prop="displayName">
        <el-input
          v-model="form.displayName"
          :disabled="view"
          class="width520"
        />
      </el-form-item>
      <el-form-item label="法人代表" prop="legalPerson">
        <el-input
          v-model="form.legalPerson"
          :disabled="view"
          class="width205"
        />
      </el-form-item>
      <el-form-item label="公司电话" prop="phoneNumber">
        <el-input
          v-model="form.phoneNumber"
          :disabled="view"
          class="width205"
        />
      </el-form-item>
      <el-form-item label="公司LOGO">
        <span v-if="!view" style="color:red;font-size:13px;">
          (图片格式为 JPG/JPEG/PNG 大小在2MB内)
        </span>
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :disabled="view"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" :disabled="view" class="width300" />
      </el-form-item>
      <el-form-item label="公司地区">
        <distPicker
          :province="province"
          :city="city"
          :area="area"
          :disabled="view"
          @province="onChangeProvince"
          @city="onChangeCity"
          @area="onChangeArea"
        />
      </el-form-item>
      <el-form-item label="公司地址" prop="address">
        <el-input
          v-model="form.address"
          :disabled="view"
          type="textarea"
          class="width520"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          v-if="permissionList.Organization_Company_Upd"
          type="primary"
          @click="onSubmit"
        >
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import DistPicker from "@/components/Distpicker/Distpicker.vue";
import { getCompany, updateCompany } from "@/api/organization.js";
import { ZKPubUrls } from "@/utils/url";

export default {
  name: "OrganizationCompany",
  components: { distPicker: DistPicker },
  data() {
    return {
      permissionList: [],
      // 表单
      loading: false,
      form: {
        displayName: "",
        leaderId: 0,
        leaderName: "",
        legalPerson: "",
        phoneNumber: "",
        email: "",
        area: "",
        address: "",
        logo: ""
      },
      rules: {
        displayName: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          { min: 1, max: 40, message: "长度在 1 到 40 个字符", trigger: "blur" }
        ],
        legalPerson: [
          { min: 1, max: 12, message: "长度在 1 到 12 个字符", trigger: "blur" }
        ],
        phoneNumber: [
          { min: 1, max: 12, message: "长度在 1 到 12 个字符", trigger: "blur" }
        ],
        email: [
          { min: 1, max: 40, message: "长度在 1 到 40 个字符", trigger: "blur" }
        ],
        address: [
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur"
          }
        ]
      },
      // 图片上传
      imageUrl: "",
      uploadUrl: ZKPubUrls.baseURL + "/api/UploadImg/Post",
      // 地区
      province: "",
      city: "",
      area: "",
      view: false
    };
  },
  created() {
    this.getform();
    // 权限
    var arr = this.$store.getters.permissions;
    this.permissionList.Organization_Company_Upd = arr.includes(
      "Organization_Company_Upd"
    );
    this.permissionList.Organization_Company_History = arr.includes(
      "Organization_Company_History"
    );
    this.view = !this.permissionList.Organization_Company_Upd;
  },
  methods: {
    // 获取表单信息
    getform() {
      this.loading = true;
      getCompany()
        .then(res => {
          if (res.success) {
            this.form = res.result;
            if (this.form.area) {
              // 地区
              var arr = this.form.area.split("|");
              this.province = arr[0];
              this.city = arr[1];
              this.area = arr[2];
            }
            // 图片
            this.imageUrl = this.form.logo;
          } else {
            this.$message(res.error.message);
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    // 提交表单
    onSubmit() {
      this.loading = true;
      this.form.area = this.province + "|" + this.city + "|" + this.area;
      updateCompany(this.form).then(res => {
        if (res.success) {
          this.$notify({
            title: "Success",
            message: "保存成功",
            type: "success",
            duration: 2000
          });
        } else {
          this.$message({
            message: res.error.message,
            type: "error"
          });
        }
        this.loading = false;
      });
    },
    hisLog() {
      this.$router.push({
        path: "company/hislog"
      });
    },
    // 图片上传事件
    handleAvatarSuccess(res, file) {
      if (res.success) {
        this.form.logo = res.data.url;
        this.imageUrl = URL.createObjectURL(file.raw);
      } else {
        this.$message({
          message: "上传图片错误",
          type: "error"
        });
      }
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/JPEG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 地区选择事件
    onChangeProvince(e) {
      this.province = e.value;
    },
    onChangeCity(e) {
      this.city = e.value;
    },
    onChangeArea(e) {
      this.area = e.value;
    }
  }
};
</script>
