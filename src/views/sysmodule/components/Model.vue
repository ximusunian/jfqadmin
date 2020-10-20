<template>
  <el-dialog title="功能模块" :visible.sync="isVisible" width="500px" :close-on-click-modal="false">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="标识" prop="name">
        <el-input v-model="form.name" class="width200" :disabled="openType!='create'" />
      </el-form-item>
      <el-form-item label="显示名称" prop="displayName">
         <el-input v-model="form.displayName" class="width200" />
      </el-form-item> 
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template> 
<script>
import { add, update } from "@/api/sysmodule";
export default {
  name: "sysmodulemodel",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: {}
    },
    openType: {
      type: String,
      default: "create"
    },
    success: {
      type: Function
    }
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
  data() {
    return {
      form: {
        id: 0,
        name: "",
        displayname: ""
      },
      rules: {
        name: [
          { required: true, message: "请填写设置项标识", trigger: "change" }
        ],
        displayName: [
          { required: true, message: "请填写显示名称", trigger: "change" }
        ]
      },
      loading: false
    };
  },
  watch: {
    formData(val) {
      this.form = val;
    },
    openType(val){
      if(val==='create'){
        this.form = { 
          name: "",
          displayname: ""
      };
      }
    }
  },
  created() {
    if (this.openType === "create") {
      this.form = {
        id: 0,
        name: "",
        displayname: ""
      };
    }
  },
  methods: {
    onSubmit() {  
      this.$refs["form"].validate(valid => { 
        if (valid) {
          var reqItem = this.form;
          if (this.openType === "create") {
            add(reqItem)
              .then(res => {
                this.handleResponse(res);
              })
              .catch(res => { 
                this.$message({ message: res.error, type: "error" });
              });
          } else {
            //更新
            update(reqItem)
              .then(res => {
                this.handleResponse(res);
              })
              .catch(res => { 
                this.$message({ message: res.error, type: "error" });
              });
          }
          this.isVisible = false;
        }
      });
    },
    cancel() {
      this.isVisible = false;
    },
    handleResponse(res) {
      if (res.success) {
        this.$notify({
          title: "",
          message: "保存成功",
          type: "success",
          duration: 2000
        });
        if (this.success) {
          this.success(this.form);
        }
      } else {
        this.$message({ message: res.error.message, type: "error" });
      }
    }
  }
};
</script>