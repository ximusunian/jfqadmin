<!--
 * @Description: 余额明细 -> 数据统计
 * @version: 
 * @Author: ximusunian
 * @Date: 2020-10-19 10:10:19
 * @LastEditors: ximusunian
 * @LastEditTime: 2020-10-19 13:12:06
-->
<template>
  <div id="dataStatistics">
    <div class="block">
      <span class="demonstration">筛选日期：</span>
      <el-date-picker
        v-model="value"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        size="small"
      >
      </el-date-picker>
      <el-button type="primary" icon="el-icon-search" size="mini"
        >搜索</el-button
      >
    </div>

    <el-container>
      <div class="box">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>合计用户收益</span>
          </div>
          <div class="card-contain">1.60元</div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>合计用户支出</span>
          </div>
          <div class="card-contain">0.00元</div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>合计用户余额</span>
          </div>
          <div class="card-contain">9.60元</div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>任务奖励</span>
          </div>
          <div class="card-contain">1.60元</div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>留存奖励</span>
          </div>
          <div class="card-contain">0.00元</div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>任务提成</span>
          </div>
          <div class="card-contain">0.00元</div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>充值</span>
          </div>
          <div class="card-contain">0.00元</div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>扣除</span>
          </div>
          <div class="card-contain">0.00元</div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>提现</span>
          </div>
          <div class="card-contain">0.00元</div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>提现退款</span>
          </div>
          <div class="card-contain">0.00元</div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>新手红包</span>
          </div>
          <div class="card-contain">0.00元</div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>新手奖励</span>
          </div>
          <div class="card-contain">0.00元</div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>邀请奖励</span>
          </div>
          <div class="card-contain">0.00元</div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>签到红包</span>
          </div>
          <div class="card-contain">0.00元</div>
        </el-card>
      </div>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "dataStatistics",
  data() {
    return {
      value: "",
    };
  },
  components: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
#dataStatistics {
  .el-container {
    padding: 2rem;
    .box {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .box-card {
        min-width: 13rem;
        margin-left: 1rem;
        margin-bottom: 1rem;
        .clearfix {
          text-align: center;
        }
        .card-contain {
          text-align: center;
          color: #cd0000;
          font-size: 2rem;
        }
      }
    }
  }
}
</style>
