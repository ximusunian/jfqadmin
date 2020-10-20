<!--
 * @Description: 用户提现
 * @version: 
 * @Author: ximusunian
 * @Date: 2020-10-19 15:52:10
 * @LastEditors: ximusunian
 * @LastEditTime: 2020-10-19 17:35:49
-->
<template>
   <div id="index">
     <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="用户提现" name="withdrawalRecord">
          <withdrawalRecord></withdrawalRecord>
        </el-tab-pane>
        <el-tab-pane label="查看详情" name="details">
          
        </el-tab-pane>
        <el-tab-pane label="数据统计" name="dataStatistics">
          <dataStatistics></dataStatistics>
        </el-tab-pane>
        <el-tab-pane label="数据导出" name="dataExport">
          <dataExport></dataExport>
        </el-tab-pane>
        <el-tab-pane label="参数配置" name="parameterConfiguration">
          <parameterSetting></parameterSetting>
        </el-tab-pane>
      </el-tabs>
   </div>
</template>

<script>
import withdrawalRecord from "@/views/withdrawal/withdrawalRecord"
import dataStatistics from "@/views/withdrawal/dataStatistics"
import dataExport from "@/views/withdrawal/dataExport"
import parameterSetting from "@/views/withdrawal/parameterSetting"
export default {
  name: "index",
  data() {
    return {
      activeName: 'withdrawalRecord'
    }
  },
  components: {
    withdrawalRecord,
    dataStatistics,
    dataExport,
    parameterSetting
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
#index {
  padding: 2rem;
  .el-tabs {
    width: 100%;
  }
}
</style>
