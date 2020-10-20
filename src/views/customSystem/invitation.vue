<!--
 * @Description: 用户系统 -> 邀请
 * @version: 
 * @Author: ximusunian
 * @Date: 2020-10-19 09:07:32
 * @LastEditors: ximusunian
 * @LastEditTime: 2020-10-19 09:51:23
-->
<template>
   <div id="invitation">
     <el-container>
       <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="普通用户邀请奖励" name="averageUser">
          <averageUser></averageUser>
        </el-tab-pane>
        <el-tab-pane label="会员用户邀请奖励" name="memberNotice">
          <memberNotice></memberNotice>
        </el-tab-pane>
      </el-tabs>
     </el-container>
   </div>
</template>

<script>
import averageUser from "@/views/customSystem/averageUser"
import memberNotice from "@/views/customSystem/memberNotice"
export default {
  name: "invitation",
  data() {
    return {
      activeName: 'averageUser',
    }
  },
  components: {
    averageUser,
    memberNotice
  },
  watch: {},
  mounted() {},
  methods: {
    handleClick() {
      
    }
  }
}
</script>

<style scoped lang="scss">
#invitation {
  padding: 2rem;
  .el-tabs {
    width: 100%;
  }
}
</style>
