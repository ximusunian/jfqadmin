<template>
  <el-select
    :value="modelVal"
    filterable
    clearable
    :loading="loading"
    :size="size"
    :disabled="disabled"
    :placeholder="placeholder"
    :class="myclass"
    @change="changeValue"
  >
    <el-option
      v-for="item in getOPtions()"
      :key="item.id"
      :label="item.fullName"
      :value="item.id"
    >
      <span>{{ item.fullName }}</span>
      <br style="height:1px;" />
      <span class="other">{{ item.departmentName }}</span>
    </el-option>
  </el-select>
</template>

<script>
import { getAdminSelectList } from "@/api/combobox.js";
import { localStorageManager } from "@/utils/storage";

export default {
  name: "Admin",
  model: {
    prop: "modelVal",
    event: "change"
  },
  props: {
    modelVal: {
      type: Number,
      default: null
    },
    deptId: { type: Number, default: null },
    size: { type: String, default: "mini" },
    disabled: { type: Boolean, default: false },
    placeholder: { type: String, default: "管理员" },
    myclass: { type: String, default: "" },
    clearable: { type: Boolean, default: false },
    changeCallback: { type: Function, default: undefined }
  },
  data() {
    return {
      datas: [],
      loading: false
    };
  },
  watch: {
    deptId(val) {
      this.options = this.getOPtions();
    }
  },
  created() {
    var datas = localStorageManager.getStorage("admin");
    if (datas && datas.length) {
      this.datas = datas;
    } else {
      this.query();
    }
  },
  methods: {
    getOPtions() {
      if (!this.deptId) return this.datas;
      var that = this;
      var result = this.datas.filter(item => {
        return (
          ("," + item.deptIdStr + ",").indexOf("," + that.deptId + ",") !== -1
        );
      });
      return result;
    },
    changeValue(val) {
      if (!val) val = null;
      this.$emit("change", val);
      if (this.changeCallback) {
        this.changeCallback(val);
      }
    },
    query() {
      this.loading = true;
      getAdminSelectList().then(res => {
        this.datas = res.result;
        if (this.datas) {
          localStorageManager.setStorage("admin", this.datas);
        }
        this.loading = false;
      });
    }
  }
};
</script>

<style scoped>
.el-select-dropdown__item {
  height: 48px;
  line-height: 20px;
}

.el-select-dropdown__item .other {
  color: #9ea2a8;
  font-size: 10px;
}

.el-select-dropdown__item.selected .other {
  color: #9ea2a8;
  font-size: 10px;
  font-weight: normal;
}
</style>
