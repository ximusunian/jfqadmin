<template>
  <el-dialog title="设置项" :visible.sync="isVisible" width="500px" :close-on-click-modal="false">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="标识" prop="name">
        <el-input v-model="form.name" class="width200" :disabled="openType!='create'" />
      </el-form-item>
      <el-form-item label="值" prop="value">
         <el-input v-model="form.value" class="width200" />
      </el-form-item>
      <el-form-item label="分组" prop="group">
         <el-input v-model="form.group" class="width200" placeholder="default"/>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
         <el-input v-model="form.desc"  type="textarea"
                :autosize="{ minRows: 3, maxRows: 6}"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template> 
<script>
import { add, update } from "@/api/syssetting";
export default {
  name: "settingmodel",
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
        value: "",
        group: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请填写设置项标识", trigger: "change" }
        ],
        value: [
          { required: true, message: "请填写设置项值", trigger: "change" }
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
          value: "",
          group: "",
          desc: ""
      };
      }
    }
  },
  created() {
    if (this.openType === "create") {
      this.form = {
        id: 0,
        name: "",
        value: "",
        group: "",
        desc: ""
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