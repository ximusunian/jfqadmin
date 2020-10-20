
<template>
  <el-select
    :value="strVal"
    filterable
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
import { getLegalSelect } from "@/api/combobox.js";

export default {
  name: "Legal",
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
    placeholder: { type: String, default: "主体" },
    myclass: { type: String, default: "" },
    totalList: { type: Array, default: ()=>[] },
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
    if(this.totalList && this.totalList.length > 0) {
      this.loading = true;
      this.datas = this.totalList;
      this.loading = false;
    } else {
      this.query();
    }
    // this.query();
  },
  methods: {
    changeValue(data) { 
      if (!data) data = 0;
      this.$emit("change", data);
    },
    query(query) {
      this.loading = true;
      if (!query) query = "";
      getLegalSelect({ Keyword: query }).then(res => {
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