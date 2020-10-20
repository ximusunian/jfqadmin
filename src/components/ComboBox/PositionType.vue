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
import { getPositionTypeSelect } from "@/api/combobox.js";

export default {
  name: "PositionType",
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
    placeholder: { type: String, default: "职位类别" },
    myclass: { type: String, default: "" }
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
    query(query) {
      this.loading = true;
      if (!query) query = "";
      getPositionTypeSelect({ Keyword: query }).then(res => {
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
