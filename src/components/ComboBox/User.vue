
<template>
  <el-select :value="selectedValue" @change="changeValue" :loading="listLoading" :size="size" :disabled="disabled" :placeholder="placeholder" :class="myclass" :clearable="clearable" :filterable="filterable">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
import { getselecteduser } from "@/api/user"; 

export default {
  name: "User",
  model: {
    prop: "selectedValue",
    event: "change"
  },
  props: {
    selectedValue: { type: Number },
    size: { type: String, default: "mini" },
    disabled: { type: Boolean, default: false },
    placeholder: { type: String, default: "用户" },
    myclass: { type: String, default: "" },
    clearable: { type: Boolean, default: false },
    filterable: { type: Boolean, default: false },
    totalList: {
      type: Array ,
      default:[]
    },
  },
  data() {
    return {
      listLoading: false,
      options: [],
    };
  },
  created() { 
    this.getList();
  },
  methods: {
    getList() {
      if(this.totalList && this.totalList.length > 0) {
        this.options = this.totalList.map(item => {
          item.value = item.id;
          item.label = item.userName;
          return item;
        });
        this.listLoading = false;
      } else {
        // 获取用户列表
        getselecteduser().then( res => {
          this.options = res.result.map(item => {
            item.value = item.id;
            item.label = item.userName;
            return item;
          });
        });
      }
    },
    changeValue(val) {
      this.$emit("change", val);
      this.$emit('doMethod', true);
    }
  }
};
</script>