<template>
  <el-dialog
    title="编辑职位类别"
    :visible.sync="isVisible"
    width="500px"
    :close-on-click-modal="false"
  >
    <el-form
      :ref="formName"
      v-loading="loading"
      :rules="rules"
      :model="form"
      label-width="150px"
    >
      <el-form-item label="类别名称" prop="displayName">
        <el-input
          v-model="form.displayName"
          class="width200"
          placeholder="类别名称"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          v-if="permissionList.Organization_Position_Setting_Upd"
          type="primary"
          @click="onSubmit"
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
import { getPositionType, updatePositionType } from "@/api/organization.js";

export default {
  name: "UpdateType",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: -1
    },
    success: {
      type: Function,
      default: undefined
    }
  },
  data() {
    return {
      permissionList: [],
      formName: "updateForm",
      rules: {
        displayName: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 1, max: 40, message: "长度在 1 到 40 个字符", trigger: "blur" }
        ]
      },
      form: {
        displayName: ""
      },
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
  watch: {
    id(val) {
      if (this.isVisible && this.id > 0) {
        this.getform();
        // 清空上一次验证
        this.$nextTick(() => {
          this.$refs[this.formName].resetFields();
        });
      }
    }
  },
  created() {
    // 权限
    var arr = this.$store.getters.permissions;
    this.permissionList.Organization_Position_Setting_Upd = arr.includes(
      "Organization_Position_Setting_Upd"
    );
  },
  methods: {
    getform() {
      getPositionType({ id: this.id }).then(res => {
        if (res.success) {
          this.form = res.result;
        } else {
          this.$message({
            message: res.error.message,
            type: "error"
          });
        }
      });
    },
    onSubmit() {
      this.$refs[this.formName].validate(valid => {
        if (valid) {
          this.loading = true;
          updatePositionType(this.form)
            .then(res => {
              if (res.success) {
                this.$notify({
                  title: "Success",
                  message: "保存成功",
                  type: "success",
                  duration: 2000
                });
                if (this.success) {
                  this.success(this.index, res.result);
                }
                this.isVisible = false;
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
    }
  }
};
</script>
