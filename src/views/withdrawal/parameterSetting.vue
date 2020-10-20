<!--
 * @Description: 用户提现 -> 参数设置
 * @version: 
 * @Author: ximusunian
 * @Date: 2020-10-19 15:42:18
 * @LastEditors: ximusunian
 * @LastEditTime: 2020-10-20 09:51:27
-->
<template>
  <div id="parameterSetting">
    <div class="box">
      <el-form ref="form" :model="form" label-width="120px">
        <div class="title">提现参数配置：</div>
        <el-form-item label="开启提现" size="medium">
          <el-switch
            v-model="form.canWithdrawal"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="开启提现（是）"
            inactive-text="开启提现（否）"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="提现次数" size="medium">
          <div class="line">
            <el-input v-model="form.withdrawalNum" placeholder=""></el-input>
            <span class="tips">同用户每天最多允许提现次数,0为不限制</span>
          </div>
        </el-form-item>
        <el-form-item label="重复提现" size="medium">
          <el-switch
            v-model="form.canWithdrawal"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="允许重复（是）"
            inactive-text="允许重复（否）"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="提现总额" size="medium">
          <div class="line">
            <el-input
              v-model="form.withdrawalLimitNum"
              placeholder=""
            ></el-input>
            <span class="tips">用户每日最多允许提现金额</span>
          </div>
        </el-form-item>
        <el-form-item label="提现金额" size="medium">
          <div class="line">
            <el-input
              v-model="form.withdrawalMinAccount"
              placeholder=""
            ></el-input>
            <span class="tips">(单位元)单次提现最小金额</span>
          </div>
        </el-form-item>
        <el-form-item label="提现金额" size="medium">
          <div class="line">
            <el-input
              v-model="form.withdrawalMaxAccount"
              placeholder=""
            ></el-input>
            <span class="tips">(单位元)单次提现最大金额</span>
          </div>
        </el-form-item>
        <el-form-item label="提现时间" size="medium">
          <div class="line">
            <el-input
              v-model="form.withdrawalStartTime"
              placeholder=""
            ></el-input>
            <span class="tips">(小时分钟)每日开始提现的时间</span>
          </div>
        </el-form-item>
        <el-form-item label="结束时间" size="medium">
          <div class="line">
            <el-input
              v-model="form.withdrawalEndTime"
              placeholder=""
            ></el-input>
            <span class="tips">(小时分钟)每日结束提现的时间</span>
          </div>
        </el-form-item>
        <el-form-item label="免费提现额度" size="medium">
          <div class="line">
            <el-input v-model="form.withdrawalLines" placeholder=""></el-input>
            <span class="tips">免费的提现额度</span>
          </div>
        </el-form-item>
        <el-form-item label="提现手续费" size="medium">
          <div class="line">
            <el-input v-model="form.withdrawalLines" placeholder=""></el-input>
            <span class="tips1">（%）百分比(支付宝)</span>
            <el-input v-model="form.withdrawalLines" placeholder=""></el-input>
            <span class="tips1">（%）百分比(微信)</span>
          </div>
        </el-form-item>

        <div class="title">支付宝提现设置：</div>
        <el-form-item label="开启支付宝功能" size="medium">
          <el-switch
            v-model="form.canAlipayWithdrawal"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="开启支付宝（是）"
            inactive-text="开启支付宝（否）"
          >
          </el-switch>
          <span class="tips">关闭后将不再使用支付宝提现功</span>
        </el-form-item>
        <el-form-item label="开启支付宝功能" size="medium">
          <el-radio-group v-model="form.orderReview" size="mini">
            <el-radio-button label="需要审核（是）"></el-radio-button>
            <el-radio-button label="需要审核（否）"></el-radio-button>
            <el-radio-button label="设置金额"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核金额" size="medium">
          <div class="line">
            <el-input
              v-model="form.reviewAmount"
              placeholder=""
            ></el-input>
            <span class="tips1">(元)提现超过当前金额需要审核</span>
          </div>
        </el-form-item>
        <el-form-item label="" size="medium">
          <div class="line">
            <el-input
              v-model="form.reviewAmount"
              placeholder=""
            ></el-input>
            <span class="tips1">(元)提现超过当前金额需要审核</span>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "parameterSetting",
  data() {
    return {
      form: {
        canWithdrawal: true,
        withdrawalNum: "",
        withdrawalLimitNum: "",
        withdrawalAccount: "",
        withdrawalStartTime: "",
        withdrawalEndTime: "",
        withdrawalLines: "",
        canAlipayWithdrawal: true,
        orderReview: "",
        reviewAmount: ""
      },
    };
  },
  components: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
#parameterSetting {
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
  .line {
    display: flex;
  }
  .tips {
    width: 50%;
    float: right;
    color: #aaaaaa;
    margin-left: 1rem;
  }
  .tips1 {
    width: 60%;
    float: right;
    color: #aaaaaa;
    margin-left: 0.5rem;
    margin-right: 1.5rem;
  }
}
</style>
