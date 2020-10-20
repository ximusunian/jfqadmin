<template>
  <el-select
    :value="modelVal"
    :clearable="clearable"
    :size="size"
    :disabled="disabled"
    :placeholder="placeholder"
    :class="myclass"
    @change="changeValue"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
export default {
  name: "DepartmentType",
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
    placeholder: { type: String, default: "部门类别" },
    myclass: { type: String, default: "" },
    clearable: { type: Boolean, default: true }
  },
  data() {
    return {
      options: [
        {
          value: 1,
          label: "子公司"
        },
        {
          value: 2,
          label: "事业部"
        },
        {
          value: 3,
          label: "部门"
        },
        {
          value: 4,
          label: "组"
        }
      ]
    };
  },
  created() {},
  methods: {
    changeValue(val) {
      if (!val) val = null;
      this.$emit("change", val);
    }
  }
};
</script>
