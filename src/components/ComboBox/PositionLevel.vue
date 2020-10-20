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
      v-for="item in datas"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
import { getPositionLevelSelect } from "../../api/combobox.js";

export default {
  name: "PositionLevel",
  model: {
    prop: "modelVal",
    event: "change"
  },
  props: {
    modelVal: {
      type: Number,
      default: null
    },
    positionId: {
      type: Number,
      default: null
    },
    size: { type: String, default: "mini" },
    disabled: { type: Boolean, default: false },
    placeholder: { type: String, default: "职位等级" },
    myclass: { type: String, default: "" },
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
    },
    query() {
      this.loading = true;
      getPositionLevelSelect().then(res => {
        var arr = [];
        res.result.forEach(element => {
          arr.push({
            value: element.id,
            label: element.displayName
          });
        });
        this.datas = arr;
        this.optionsList = arr;
        this.loading = false;
      });
    }
  }
};
</script>
