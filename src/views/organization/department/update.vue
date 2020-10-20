<template>
  <el-dialog
    title="编辑部门"
    :visible.sync="isVisible"
    width="500px"
    :close-on-click-modal="false"
    :loading="loading"
  >
    <el-form
      :ref="formName"
      v-loading="loading"
      :model="form"
      label-width="150px"
    >
      <el-form-item label="名称">
        <el-input v-model="form.displayName" style="width:178px;" />
      </el-form-item>
      <el-form-item label="类别">
        <departmentType v-model="form.type" />
      </el-form-item>
      <el-form-item label="上级部门">
        <department ref="dept" v-model="form.parentId" :remove-id="form.id" />
      </el-form-item>
      <el-form-item label="负责人">
        <admin v-model="form.leaderId" :dept-id="form.parentId" />
      </el-form-item>
      <el-form-item>
        <el-button
          v-if="permissionList.Organization_Department_Upd"
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
import { getDepartment, updateDepartment } from "@/api/organization.js";
import DepartmentType from "@/components/ComboBox/DepartmentType.vue";
import Department from "@/components/ComboBox/Department.vue";
import Admin from "@/components/ComboBox/Admin.vue";
import { localStorageManager } from "@/utils/storage";

export default {
  name: "UpdateDepartment",
  components: {
    departmentType: DepartmentType,
    department: Department,
    admin: Admin
  },
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
      loading: false,
      formName: "updateForm",
      permissionList: [],
      rules: {
        displayName: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 1, max: 40, message: "长度在 1 到 40 个字符", trigger: "blur" }
        ]
      },
      form: {
        parentId: null,
        type: null,
        displayName: "",
        leaderId: null
      },
      selectedId: null
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
    this.permissionList.Organization_Department_Upd = arr.includes(
      "Organization_Department_Upd"
    );
  },
  methods: {
    getform() {
      this.loading = true;
      this.selectedId = this.id;
      getDepartment({ id: this.id })
        .then(res => {
          this.form = res.result;
          if (!this.form.parentId) {
            this.form.parentId = null;
          }
          if (!this.form.leaderId) {
            this.form.leaderId = null;
          }
          this.$refs.dept.initHandle(this.form.parentId);
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
        });
    },
    onSubmit() {
      this.$refs[this.formName].validate(valid => {
        if (valid) {
          this.loading = true;
          if (!this.form.leaderId) {
            this.form.leaderId = 0;
          }
          if (!this.form.parentId) {
            this.form.parentId = 0;
          }
          updateDepartment(this.form)
            .then(res => {
              if (res.success) {
                this.$notify({
                  title: "Success",
                  message: "保存成功",
                  type: "success",
                  duration: 2000
                });
                localStorageManager.removeStorage("department");
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
