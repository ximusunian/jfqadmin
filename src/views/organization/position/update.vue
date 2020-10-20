<template>
  <el-dialog
    title="编辑职位"
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
      <el-form-item label="职位名称" prop="displayName">
        <el-input v-model="form.displayName" class="width200" />
      </el-form-item>
      <el-form-item label="职位类别" prop="positionTypeId">
        <positionType v-model="form.positionTypeId" myclass="width200" />
      </el-form-item>
      <el-form-item label="职位等级" prop="positionLevels">
        <mutiPositionLevel v-model="form.positionLevels" myclass="width200" />
      </el-form-item>
      <el-form-item label="职位描述">
        <el-input v-model="form.desc" type="textarea" class="width200" />
      </el-form-item>
      <el-form-item>
        <el-button
          v-if="permissionList.Organization_Position_Position_Upd"
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
import { getPosition, updatePosition } from "@/api/organization.js";
import PositionType from "@/components/ComboBox/PositionType.vue";
import MutiPositionLevel from "@/components/ComboBox/MutiPositionLevel.vue";

export default {
  name: "UpdatePosition",
  components: {
    positionType: PositionType,
    mutiPositionLevel: MutiPositionLevel
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
      type: Function
    }
  },
  data() {
    return {
      permissionList: [],
      formName: "updateForm",
      rules: {
        displayName: [
          { required: true, message: "请输入职位名称", trigger: "blur" },
          { min: 1, max: 40, message: "长度在 1 到 40 个字符", trigger: "blur" }
        ],
        positionTypeId: [
          { required: true, message: "请选择职位类别", trigger: "blur" }
        ],
        positionLevels: [
          { required: true, message: "请选择职位等级", trigger: "blur" }
        ]
      },
      form: {
        companyId: 3,
        displayName: "",
        positionTypeId: 0,
        positionLevels: [],
        desc: ""
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
    this.permissionList.Organization_Position_Position_Upd = arr.includes(
      "Organization_Position_Position_Upd"
    );
  },
  methods: {
    getform() {
      this.loading = true;
      getPosition({ id: this.id }).then(res => {
        this.form = res.result;
      });
      this.loading = false;
    },
    onSubmit() {
      this.$refs[this.formName].validate(valid => {
        if (valid) {
          this.loading = true;
          updatePosition(this.form)
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
