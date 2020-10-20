
<template>
  <div>
    <div class="dis-flex-left">
      <el-select
        v-model="selectedValue"
        filterable
        :loading="loading"
        ref="select"
        @change="changeValue"
        multiple
        :collapse-tags="collapsetags"
        :size="size"
        :disabled="disabled"
        :placeholder="placeholder"
        :class="myclass"
        :clearable="clearable"
      >
        <el-option v-for="item in datas" :key="item.value" :label="item.label" :value="item.value">
          <span>{{ item.label }}</span>
          <br style="height:1px;" />
          <span class="other">{{ item.fullName }}</span>
        </el-option>
      </el-select>
      <el-button v-if="!disabled && hasDrawer" @click="isVisible = true" type="primary" class="ml16" icon="el-icon-search" circle></el-button>
    </div>

    <el-drawer :visible.sync="isVisible" :with-header="false" :append-to-body="true" :loading="treeloading" direction="rtl">
      <div class="page">
        <div class="title">
          <span>选择部门</span>
          <el-divider></el-divider>
          <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
          <br />
          <br />
        </div>
        <div class="body">
          <CustomTree
            class="filter-tree"
            :data="treedatas"
            show-checkbox
            node-key="id"
            :loading="treeloading"
            :default-expanded-keys="expendedKeys"
            check-strictly
            :props="defaultProps"
            :filter-node-method="filterNode" 
            ref="tree"
          ></CustomTree>
        </div>
        <div class="footer">
          <el-button type="primary" size="medium" @click="select">确定</el-button>
          <el-button type="primary" size="medium" @click="cancel">取消</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { getDepartmentSelectList } from "@/api/combobox.js";
import CustomTree from "@/components/tree/src/tree.vue";
import { getOrgImg } from "@/api/organization";

export default {
  name: "MutiDepartment",
  model: {
    prop: "modelVal",
    event: "change"
  },
  props: {
    modelVal: { type: Array, default: ()=>[] },
    size: { type: String, default: "mini" },
    expendedKeys: { type: Array },
    disabled: { type: Boolean, default: false },
    placeholder: { type: String, default: "部门" },
    myclass: { type: String, default: "" },
    changeCallback: { type: Function },
    collapsetags: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
    hasDrawer: { type: Boolean, default: true },
    visible: { type: Boolean, default: false },
    disabledKeys: { type: Array, default: () => [] },
    success: { type: Function }
  },
  components: {
    CustomTree
  },
  computed: {
    isVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    modelVal(val){
      this.selectedValue = val;
    }, 
    isVisible(val) {
      if (val) {
        if (this.treedatas) {
          if (this.treedatas.length > 0) {
           this.setDefaultTree();
          } else {
            this.treequery(res => {
             this.setDefaultTree();
            });
          }
        }
      }
    }
  },
  data() {
    return {
      datas: [],
      loading: false,
      treeloading: false,
      selectedValue: this.modelVal,
      filterText: "",
      treedatas: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    this.query();
    //this.treequery();
  },
  methods: {
    query(query) {
      this.loading = true;
      if (!query) query = "";
      getDepartmentSelectList({ Keyword: query }).then(res => {
        var arr = [];
        res.result.forEach(element => {
          arr.push({
            value: element.id,
            label: element.displayName,
            fullName: element.fullName
          });
        });
        this.datas = arr;
        this.setCheckedKeys(this.selectedValue);
        this.loading = false;
      });
    },
    changeValue(val) {
      if (!val) val = 0;
      this.$emit("change", val);
      if (this.changeCallback) {
        this.changeCallback(val);
      }
    },
    treequery(callback) {
      this.treeloading = true;
      getOrgImg()
        .then(res => {
          this.treedatas = res.result.children;
          // this.treedatas.forEach(item => {
          //   this.setNodeDisable(item);
          // });
          this.treeloading = false;
        })
        .then(res => {
          if (callback) {
            callback(res);
          }
        });
    },
    setNodeDisable(node, isExist) {
      if (node.id != 0) {
        node.showCheckbox = true;
      } else {
        node.showCheckbox = false;
      }
      var isExist = isExist || this.disabledKeys.indexOf(node.id) > -1;
      if (isExist) node.disabled = true;
      if (node.children) {
        node.children.forEach(item => {
          this.setNodeDisable(item, isExist);
        });
      }
    },
    filterNode(value, data, node) {
      if (!value) {
        return true;
      }
      let level = node.level;
      let _array = []; //这里使用数组存储 只是为了存储值。
      this.getReturnNode(node, _array, value);
      let result = false;
      _array.forEach(item => {
        result = result || item;
      });
      return result;
    },
    getReturnNode(node, _array, value) {
      let isPass =
        node.data && node.data.label && node.data.label.indexOf(value) !== -1;
      isPass ? _array.push(isPass) : "";
      this.index++; 
      if (!isPass && node.level != 1 && node.parent) {
        this.getReturnNode(node.parent, _array, value);
      }
    },
    setCheckedKeys(arr) {
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(arr);
      });
    },
    setDefaultTree() {
      this.treedatas.forEach(item => {
        this.setNodeDisable(item);
      });
      this.setCheckedKeys(this.selectedValue);
      this.setExpenedKeys(this.selectedValue);
    },
    setExpenedKeys(arr) {
      this.expendedKeys = arr;
    },
    select() { 
      var selectedKeys = this.$refs.tree.getCheckedKeys();
       
      this.selectedValue = selectedKeys;   
      if (this.success) {   
        this.success(selectedKeys);
      } 
     
      this.isVisible = false;
    },
    cancel() {
      this.isVisible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.page {
  padding: 10px;
  height: 100%;
}
.title {
  font-size: 18px;
  color: #606266;
  line-height: 1.5em;
}
.body {
  position: fixed;
  overflow-y: scroll;
  width: 100%;
  height: calc(100% - 200px);
}
.footer {
  margin-bottom: 10px;
  position: fixed;
  bottom:
   0px;
}
.el-select-dropdown__item {
  height: 48px;
  line-height: 20px;
}

.el-select-dropdown__item .other {
  color: #9ea2a8;
  font-size: 10px;
}

.el-select-dropdown__item.selected .other {
  color: #9ea2a8;
  font-size: 10px;
  font-weight: normal;
}
</style>