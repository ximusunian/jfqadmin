<template>
  <div class="dis-flex-left">
    <div>
    <el-select 
      v-model="curuserList"
      :loading="listLoading"
      :size="size"
      :class="myclass"
      :placeholder="placeholder"
      :multiple="true"
      :clearable="clearable"
      :filterable="filterable"
      :collapse-tags="collapsetags"
      @remove-tag="removeTag"
      @change="changeValue"
    > 
      <el-option 
          v-for="item in userList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
    </el-select>
    </div> 
  </div>
</template>

<script> 
let curPage = 1;
import { GetAllUser } from "@/api/user"; 

export default {
  name: "UserSelect",
  model: {
    prop: "curUserSelected",
    event: "change"
  },
  data() {
    return {
      isSuccess: false,
      listLoading: false,  
      userList: [],
      curuserList: [] 
    };
  },
  props: {
    changeCallback: { type: Function },
    curUserSelected: {
      type: Array,
      default: []
    },
    size: { type: String, default: "mini" },
    placeholder: { type: String, default: "请选择用户" },
    myclass: { type: String, default: "" },
    clearable: { type: Boolean, default: true },
    filterable: { type: Boolean, default: true },
    collapsetags: { type: Boolean, default: true },
    isUserName: { type: Boolean, default: false },
  },
  watch: {
    curUserSelected: {
      handler(newValue, oldValue) {  
        this.$nextTick(() => {
        this.curuserList = newValue; 
      })
      }, 
      immediate:true,
      deep:true
    } 
  },
  created() { 
    this.getuserList();
    // this.getWechatGroupList();
  },
  methods: {
    getuserList() {
      this.listLoading = true;
      // 获取公众号列表
      GetAllUser(false).then( res => { 
        this.userList = res.result.map(item => {
          item.value = item.id;
          item.label = this.isUserName ? item.userName : item.fullName;
          return item;
        });
        this.listLoading = false;
      });
    },
     selectAllWechat() {
      this.curuserList = this.userList.map(item => {
        return item.userName;
      });
    },
    unselectAllWechat() {
      this.curuserList = [];
    },
    changeValue(val) { 
      if (!val) val = null;   
      this.$emit("change", val);
      if (this.changeCallback) {
        this.changeCallback(val);
      }
    },
    removeTag() {
      this.curuserList = []; 
    }, 
  }
};
</script> 
