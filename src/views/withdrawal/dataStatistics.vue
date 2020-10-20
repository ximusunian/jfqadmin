<!--
 * @Description: 用户提现 -> 数据统计
 * @version: 
 * @Author: ximusunian
 * @Date: 2020-10-19 15:40:32
 * @LastEditors: ximusunian
 * @LastEditTime: 2020-10-19 16:05:08
-->
<template>
  <div id="dataStatistics">
    <el-container>
      <div class="box">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今日提现总金额</span>
          </div>
          <div class="card-contain">0.00元</div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今日已同意提现</span>
          </div>
          <div class="card-contain">0.00元</div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今日已驳回提现</span>
          </div>
          <div class="card-contain">0.00元</div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今日待处理提现</span>
          </div>
          <div class="card-contain">0.00元</div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>昨日提现总金额</span>
          </div>
          <div class="card-contain">0.00元</div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>昨日已同意提现</span>
          </div>
          <div class="card-contain">0.00元</div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>昨日已驳回提现</span>
          </div>
          <div class="card-contain">0.00元</div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>昨日待处理提现</span>
          </div>
          <div class="card-contain">0.00元</div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>本周提现总金额</span>
          </div>
          <div class="card-contain">0.00元</div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>本周已同意提现</span>
          </div>
          <div class="card-contain">0.00元</div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>本周已驳回提现</span>
          </div>
          <div class="card-contain">0.00元</div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>本周待处理提现</span>
          </div>
          <div class="card-contain">0.00元</div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>总计提现总金额</span>
          </div>
          <div class="card-contain">0.00元</div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>总计已同意提现</span>
          </div>
          <div class="card-contain">0.00元</div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>总计已驳回提现</span>
          </div>
          <div class="card-contain">0.00元</div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>总计待处理提现</span>
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
