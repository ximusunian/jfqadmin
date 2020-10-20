<!--
 * @Description: 用户系统 -> 余额明细
 * @version: 
 * @Author: ximusunian
 * @Date: 2020-10-16 16:49:31
 * @LastEditors: ximusunian
 * @LastEditTime: 2020-10-19 14:16:36
-->
<template>
   <div id="balanceSubsidiary">
     <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="余额明细" name="balance">
          <balance></balance>
        </el-tab-pane>
        <el-tab-pane label="账户充值" name="recharge">
          <recharge></recharge>
        </el-tab-pane>
        <el-tab-pane label="数据统计" name="dataStatistics">
          <dataStatistics></dataStatistics>
        </el-tab-pane>
      </el-tabs>
   </div>
</template>

<script>
import balance from "@/views/customSystem/balance"
import recharge from "@/views/customSystem/recharge"
import dataStatistics from "@/views/customSystem/dataStatistics"
export default {
  name: "balanceSubsidiary",
  data() {
    return {
      activeName: 'balance'
    }
  },
  components: {
    balance,
    recharge,
    dataStatistics
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
#balanceSubsidiary {
  padding: 2rem;
  .el-tabs {
    width: 100%;
  }
}
</style>
