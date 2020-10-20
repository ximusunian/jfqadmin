
<template>
  <el-select
    :value="strVal"
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
import { getPositionSelect } from "../../api/combobox.js";

export default {
  name: "Position",
  model: {
    prop: "modelVal",
    event: "change"
  },
  props: {
    modelVal: {
      type: Number || String,
      default: 0
    },
    size: { type: String, default: "mini" },
    disabled: { type: Boolean, default: false },
    placeholder: { type: String, default: "职位" },
    myclass: { type: String, default: "" },
    clearable: { type: Boolean, default: false },
  },
  computed: {
    strVal: {
      get() {
        if (
          this.modelVal === 0 ||
          this.modelVal === null ||
          this.modelVal === undefined
        )
          return "";
        return this.modelVal;
      },
      set(val) {
        this.$emit("update:modelVal", this.modelVal);
      }
    }
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
      if (!val) val = 0;
      this.$emit("change", val);
    },
    query(query) {
      this.loading = true;
      if (!query) query = "";
      getPositionSelect({ Keyword: query }).then(res => {
        var arr = [];
        res.result.items.forEach(element => {
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