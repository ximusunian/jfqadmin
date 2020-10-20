<template>
  <el-dialog
    title="新增公司主体"
    :visible.sync="isVisible"
    width="800px"
    :close-on-click-modal="false"
  >
    <el-form
      :ref="formName"
      v-loading="loading"
      :model="form"
      :rules="rules"
      label-width="150px"
    >
      <el-form-item label="主体名称" prop="displayName">
        <el-input v-model="form.displayName" class="width520" />
      </el-form-item>
      <el-form-item label="统一社会信用代码" prop="code">
        <el-input v-model="form.code" class="width520" />
      </el-form-item>
      <el-form-item label="法人姓名" prop="legalPerson">
        <el-input v-model="form.legalPerson" class="width520" />
      </el-form-item>
      <el-form-item label="法人身份证证号" prop="iDCard">
        <el-input v-model="form.iDCard" class="width520" />
      </el-form-item>
      <el-form-item label="对公银行开户行" prop="bank">
        <el-input v-model="form.bank" class="width520" />
      </el-form-item>
      <el-form-item label="对公银行账号" prop="bankNo">
        <el-input v-model="form.bankNo" class="width520" />
      </el-form-item>
      <el-form-item label="公司地址" prop="address">
        <el-input v-model="form.address" type="textarea" class="width520" />
      </el-form-item>
      <el-form-item label="营业执照">
        <span style="color:red;font-size:13px;">
          (图片格式为 JPG/JPEG/PNG 大小在2MB内)
        </span>
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button
          v-if="permissionList.Organization_Legal_Add"
          type="primary"
          @click="onSubmit('createForm')"
        >
          保存
        </el-button>
        <el-button type="primary" @click="cancel">
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { createLegal } from "@/api/organization.js";
import { ZKPubUrls } from "@/utils/url";

export default {
  name: "CreateLegal",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    success: {
      type: Function,
      default: undefined
    }
  },
  data() {
    return {
      formName: "createForm",
      permissionList: [],
      rules: {
        displayName: [
          { required: true, message: "请输入主体名称", trigger: "blur" },
          { min: 1, max: 40, message: "长度在 1 到 40 个字符", trigger: "blur" }
        ],
        legalPerson: [
          { min: 1, max: 12, message: "长度在 1 到 12 个字符", trigger: "blur" }
        ],
        iDCard: [
          { min: 18, max: 18, message: "长度为 18 个字符", trigger: "blur" }
        ],
        bank: [
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur"
          }
        ],
        bankNo: [
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur"
          }
        ],
        code: [
          { min: 1, max: 18, message: "长度在 1 到 18 个字符", trigger: "blur" }
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
      form: {
        displayName: "",
        legalPenson: "",
        iDCard: "",
        bank: "",
        bankNo: "",
        code: "",
        address: "",
        license: ""
      },
      imageUrl: "",
      uploadUrl: ZKPubUrls.baseURL + "/api/UploadImg/Post",
      loading: false
    };
  },
  computed: {
    isVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    }
  },
  created() {
    // 权限
    var arr = this.$store.getters.permissions;
    this.permissionList.Organization_Legal_Add = arr.includes(
      "Organization_Legal_Add"
    );
  },
  methods: {
    onSubmit() {
      this.$refs[this.formName].validate(valid => {
        if (valid) {
          this.loading = true;
          createLegal(this.form)
            .then(res => {
              if (res.success) {
                this.$notify({
                  title: "Success",
                  message: "保存成功",
                  type: "success",
                  duration: 2000
                });
                if (this.success) {
                  this.success(res.result);
                }
                this.isVisible = false;
                this.form = {};
              } else {
                this.$message({
                  message: res.error.message,
                  type: "error"
                });
              }
              this.loading = false;
            })
            .catch(error => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.isVisible = false;
    },
    handleAvatarSuccess(res, file) {
      if (res.success) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.form.license = res.data.url;
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
    }
  }
};
</script>
