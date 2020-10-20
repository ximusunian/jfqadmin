<!--
 * @Description: 系统公告
 * @version: 
 * @Author: ximusunian
 * @Date: 2020-10-16 13:49:02
 * @LastEditors: ximusunian
 * @LastEditTime: 2020-10-16 14:28:40
-->
<template>
  <div id="systemNotice">
    <el-container>
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="用户公告" name="userNotice">
          <userNotice></userNotice>
        </el-tab-pane>
        <el-tab-pane label="添加公告" name="addNotice">
          <addNotice></addNotice>
        </el-tab-pane>
      </el-tabs>
    </el-container>
  </div>
</template>

<script>
import userNotice from "@/views/contentManagement/userNotice"
import addNotice from "@/views/contentManagement/addNotice"
export default {
  name: "systemNotice",
  data() {
    return {
      activeName: 'userNotice',
    };
  },
  components: {
    userNotice,
    addNotice
  },
  watch: {},
  mounted() {},
  methods: {
    handleClick() {
      
    }
  },
};
</script>

<style scoped lang="scss">
#systemNotice {
  padding: 2rem;
  .el-tabs {
    width: 100%;
  }
}
</style>
