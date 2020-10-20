<template>
  <el-dialog
    title="新增职位等级"
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
      <el-form-item label="等级名称" prop="displayName">
        <el-input
          v-model="form.displayName"
          class="width200"
          placeholder="等级名称"
        />
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model="form.order" class="width200" />
      </el-form-item>
      <el-form-item>
        <el-button
          v-if="permissionList.Organization_Position_Setting_Add"
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
import { createPositionLevel } from "@/api/organization.js";

export default {
  name: "CreateLevel",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    success: {
      type: Function
    }
  },
  data() {
    return {
      permissionList: [],
      formName: "createForm",
      rules: {
        displayName: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 1, max: 40, message: "长度在 1 到 40 个字符", trigger: "blur" }
        ]
      },
      form: {
        displayName: "",
        order: 0
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
  created() {
    // 权限
    var arr = this.$store.getters.permissions;
    this.permissionList.Organization_Position_Setting_Add = arr.includes(
      "Organization_Position_Setting_Add"
    );
  },
  methods: {
    onSubmit() {
      this.$refs[this.formName].validate(valid => {
        if (valid) {
          this.loading = true;
          createPositionLevel(this.form)
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
    }
  }
};
</script>
