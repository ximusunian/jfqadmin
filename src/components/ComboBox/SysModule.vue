
<template>
  <el-select
    :value="modelVal"
    filterable
    clearable
    :loading="loading"
    @change="changeValue"
    :size="size"
    :disabled="disabled"
    :placeholder="placeholder" 
    :class="myclass"
  >
    <el-option v-for="item in datas" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
import { alldata } from "../../api/sysmodule.js";

export default {
  name: "SysModule",
  model: {
    prop: "modelVal",
    event: "change"
  },
  props: {
    modelVal: {
      type: Number,
      default: null
    },
    size: { type: String, default: "mini" },
    disabled: { type: Boolean, default: false },
    placeholder: { type: String, default: "部门" },
    myclass: { type: String, default: "" },
    changeCallback: { type: Function },
    clearable: { type: Boolean, default: false }
  },
  data() {
    return {
      datas: [],
      loading: false
    };
  },
  created() {
    this.query();
  },
  methods: {
    changeValue(val) {
      if (!val) val = null;
      this.$emit("change", val);
      if (this.changeCallback) {
        this.changeCallback(val);
      }
    },
    query(query) {
      this.loading = true;
      if (!query) query = "";
      alldata().then(res => {
        var arr = []; 
        res.result.forEach(element => {
          arr.push({
            value: element.id,
            label: element.displayName
          });
        }); 
        this.datas = arr;
        this.loading = false;
      });
    } 
  }
};
</script>