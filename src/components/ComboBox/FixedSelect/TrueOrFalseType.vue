
<template>
  <!-- <el-switch 
    :value="selectedValue" 
    @change="changeValue" 
    :size="size" 
    :disabled="disabled" 
    :class="myclass" 
    active-color="#13ce66" 
    inactive-color="#ff4949" 
    :active-value="activevalue" 
    :inactive-value="inactivevalue" 
    :active-text="activetext" 
    :inactive-text="inactivetext" 
  /> -->
  <el-select :value="selectedValue" @change="changeValue" :size="size" :disabled="disabled" :placeholder="placeholder" :class="myclass" :clearable="clearable">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
const optionsList = [{
    value: true,
    label: "是"
},{
    value: false,
    label: "否"
}];
export default {
  optionsList: optionsList,
  name: "TrueOrFalseType",
  model: {
    prop: "selectedValue",
    event: "change"
  },
  props: {
    selectedValue: '',
    size: { type: String, default: "mini" },
    disabled: { type: Boolean, default: false },
    placeholder: { type: String, default: "是否开启" },
    myclass: { type: String, default: "" },
    clearable: { type: Boolean, default: false },
    // activevalue: { default: true },
    // inactivevalue: { default: false },
    // activetext: { type: String, default: "是" },
    // inactivetext: { type: String, default: "否" }
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