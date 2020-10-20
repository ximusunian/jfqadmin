<!--
 * @Description: 数据导出
 * @version: 
 * @Author: ximusunian
 * @Date: 2020-10-19 16:11:48
 * @LastEditors: ximusunian
 * @LastEditTime: 2020-10-19 16:38:58
-->
<template>
  <div id="dataExport">
    <div class="box">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="开始时间" size="medium">
          <el-date-picker
            v-model="startTime"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" size="medium">
          <el-date-picker v-model="endTime" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="选择状态" size="medium">
          <el-select v-model="state" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="导出字段" size="medium">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="提现用户"></el-checkbox>
            <el-checkbox label="用户昵称"></el-checkbox>
            <el-checkbox label="订单编号"></el-checkbox>
            <el-checkbox label="提现金额"></el-checkbox>
            <el-checkbox label="提后余额"></el-checkbox>
            <el-checkbox label="提现次数"></el-checkbox>
            <el-checkbox label="收款方式"></el-checkbox>
            <el-checkbox label="收款账户"></el-checkbox>
            <el-checkbox label="订单状态"></el-checkbox>
            <el-checkbox label="提现日期"></el-checkbox>
            <el-checkbox label="处理日期"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">导出数据</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "dataExport",
  data() {
    return {
      form: {},
      startTime: "",
      endTime: "",
      state: "",
      options: [
        {
          value: "audit",
          label: "待审核",
        },
        {
          value: "withdrawaled",
          label: "已提现",
        },
        {
          value: "processing",
          label: "处理中",
        },
        {
          value: "rejected",
          label: "已驳回",
        },
      ],
      checkList: []
    };
  },
  components: {},
  watch: {},
  mounted() {},
  methods: {
    onSubmit() {
      
    }
  },
};
</script>

<style scoped lang="scss">
#dataExport {
  padding: 2rem;
  .box {
    padding: 2rem;
    background: #fff;
    border: 1px solid #dcdfe6;
    -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
      0 0 6px 0 rgba(0, 0, 0, 0.04);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  }
  .title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  .tips {
    float: right;
    color: #aaaaaa;
  }
}
</style>
