
<template>
  <el-select :value="selectedValue" @change="changeValue" :size="size" :disabled="disabled" :placeholder="placeholder" :class="myclass" :clearable="clearable">
    <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.label"></el-option>
  </el-select>
</template>

<script>
const optionsList = [{
    value: 0,
    label: "封号"
},{
    value: 1,
    label: "删文"
},{
    value: 2,
    label: "分享替换"
}];
export default {
  optionsList: optionsList,
  name: "ViolationType",
  model: {
    prop: "selectedValue",
    event: "change"
  },
  props: {
    selectedValue: { type: String },
    size: { type: String, default: "mini" },
    disabled: { type: Boolean, default: false },
    placeholder: { type: String, default: "违规处罚类型" },
    myclass: { type: String, default: "" },
    clearable: { type: Boolean, default: false },
  },
  data() {
    return {
        options: optionsList
    };
  },
  methods: {
    changeValue(val) {
      this.$emit("change", val);
    }
  }
};
</script>