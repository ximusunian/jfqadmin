<template>
  <el-select
    :v-if="update"
    v-model="modelVal"
    :loading="loading"
    :size="size"
    :disabled="disabled"
    :placeholder="placeholder"
    :class="myclass"
    :clearable="clearable"
    :remove-id="removeId"
    @clear="clearHandle"
    @change="changeValue"
  >
    <el-option :value.sync="valueId" :label.sync="valueLabel" class="options">
      <el-tree
        id="tree-option"
        ref="departmentTree"
        :accordion="accordion"
        :data="options"
        :props="defaultProps"
        :node-key="defaultProps.value"
        :default-expanded-keys="defaultExpandedKey"
        @node-click="handleNodeClick"
      />
    </el-option>
  </el-select>
</template>

<script>
import { getDepartmentSelectList } from "@/api/combobox.js";
import { localStorageManager } from "@/utils/storage";

export default {
  name: "Department",
  model: {
    prop: "modelVal",
    event: "change"
  },
  props: {
    modelVal: { type: Number, default: null },
    clearable: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    accordion: { type: Boolean, default: false },
    returnItem: { type: Boolean, default: false },
    removeId: { type: Number, default: null },
    size: { type: String, default: "mini" },
    placeholder: { type: String, default: "部门" },
    myclass: { type: String, default: "" },
    changeCallback: { type: Function, default: undefined },
    totalList: { type: Array, default: ()=>[] },
  },
  data() {
    return {
      valueId: null,
      valueLabel: "",
      defaultExpandedKey: [],
      defaultProps: {
        value: "id", // ID字段名
        label: "displayName", // 显示名称
        children: "children" // 子级字段名
      },
      datas: [],
      options: [],
      loading: false,
      update: true
    };
  },
  computed: {
    cache() {
      return localStorageManager.getStorage("department");
    }
  },
  watch: {
    cache(val) {
      // 如果cache为空，则远程查询 
      if (!val || (val && !val.length)) {
        this.query();
      }
    }
  },
  created() {
    if(this.totalList && this.totalList.length > 0) {
      this.update = false;
      this.$forceUpdate();
      this.loading = true;
      this.datas = this.totalList;
      if (this.datas) {
        localStorageManager.setStorage("department", this.datas);
        this.options = this.optionData();
      }
      this.initHandle(this.modelVal);
      this.update = true;
      this.loading = false;
    }
    // 去掉缓存
    // else if (this.cache) {
    //   this.getCache();
    // } 
    else {
      this.query();
    }
  },
  mounted() {
    this.initHandle(this.modelVal);
  },
  methods: {
    // 改变值触发
    changeValue(val) {
      if (!val) val = null;
      if(this.returnItem){
 
         this.datas.find(item => {
          if (item.id === this.valueId) {
            this.$emit("change", item);
          }
        });  
      }
      else{
        this.$emit("change", val);
      } 
      if (this.changeCallback) {
        this.changeCallback(val);
      }
    },

    // 从缓存中查询数据源
    getCache() {
      // debugger
      this.loading = true;
      this.datas = this.cache;
      this.options = this.optionData();
      this.initHandle(this.modelVal);
      this.loading = false;
    },

    // 查询数据源
    query() {
      this.update = false;
      this.$forceUpdate();
      this.loading = true;
      getDepartmentSelectList().then(res => {
        this.datas = res.result;
        if (this.datas) {
          localStorageManager.setStorage("department", this.datas);
          this.options = this.optionData();
        }
        this.initHandle(this.modelVal);
        this.update = true;
        this.loading = false;
      });
    },

    // 转树形数据
    optionData() {
      var that = this;
      // 对源数据深度克隆
      let cloneData = JSON.parse(JSON.stringify(this.datas));
      // 循环所有项，并添加children属性
      return cloneData.filter(father => {
        // 默认都展开
        that.defaultExpandedKey.push(father.id);
        // 返回每一项的子级数组
        let branchArr = cloneData.filter(
          child => father.id == child.parentId && child.id !== that.removeId
        );
        if (branchArr) {
          //给父级添加一个children属性，并赋值
          branchArr.length > 0 ? (father.children = branchArr) : "";
        }
        //返回第一层
        return father.parentId == 0 && father.id !== that.removeId;
      });
    },

    // 初始化值
    initHandle(val) {
      if (val) {
        this.valueId = val; 
        this.datas.find(item => {
          if (item.id === this.valueId) {
            this.valueLabel = item.displayName;
          }
        }); 
        this.$refs.departmentTree.setCurrentKey(val);
        // console.log(this.$refs.departmentTree.getCurrentKey())
      }
    },

    // // 初始化滚动条
    // initScroll() {
    //   this.$nextTick(() => {
    //     let scrollWrap = document.querySelectorAll(
    //       ".el-scrollbar .el-select-dropdown__wrap"
    //     )[0];
    //     let scrollBar = document.querySelectorAll(
    //       ".el-scrollbar .el-scrollbar__bar"
    //     );
    //     scrollWrap.style.cssText =
    //       "margin: 0px; max-height: none; overflow: hidden;";
    //     scrollBar.forEach(ele => (ele.style.width = 0));
    //   });
    // },

    // 切换选项
    handleNodeClick(node) {
      this.valueId = node[this.defaultProps.value];
      this.valueLabel = node[this.defaultProps.label];
      this.changeValue(this.valueId);
    },

    // 清除选中
    clearHandle() {
      this.valueLabel = "";
      this.valueId = null;
      // 清空选中样式
      let allNode = document.querySelectorAll("#tree-option .el-tree-node");
      allNode.forEach(element => element.classList.remove("is-current"));
    }
  }
};
</script>

<style scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  /* max-height: 274px; */
  padding: 0;
  overflow: hidden;
  overflow-y: hidden;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
ul li >>> .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
  margin: 0px;
}
.el-tree-node__label {
  font-weight: normal;
}
.el-tree >>> .is-current .el-tree-node__label {
  color: #409eff;
  font-weight: 700;
}
.el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
</style>
