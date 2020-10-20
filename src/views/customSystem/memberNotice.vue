<!--
 * @Description: 会员用户邀请奖励
 * @version: 
 * @Author: ximusunian
 * @Date: 2020-10-19 09:50:18
 * @LastEditors: ximusunian
 * @LastEditTime: 2020-10-19 09:56:12
-->
<template>
  <div id="memberNotice">
    <div class="box">
      <el-form ref="form" :model="form" label-width="120px">
        <div class="title">会员邀请奖励：</div>
        <el-form-item label="获得奖励" size="medium">
          <el-switch
            v-model="form.canGetReward"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="有奖励（是）"
            inactive-text="有奖励（否）"
          >
          </el-switch>
          <span class="tips">关闭后邀请无奖励</span>
        </el-form-item>
        <el-form-item label="邀请者获得" size="medium">
          <el-input
            v-model="form.inviteRewardMaster"
            placeholder="师父获得奖励"
          ></el-input>
        </el-form-item>
        <el-form-item label="下放模式" size="medium">
          <el-switch
            v-model="form.canGetReward"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="注册完成"
            inactive-text="完成任务（首次）"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="新用户获得" size="medium">
          <el-input
            v-model="form.inviteRewardDisciple"
            placeholder="徒弟获得奖励"
          ></el-input>
        </el-form-item>

        <el-divider></el-divider>

        <div class="title">会员任务提成：</div>
        <el-form-item label="开启提成" size="medium">
          <el-switch
            v-model="form.commission"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="开启提成（是）"
            inactive-text="开启提成（否）"
          >
          </el-switch>
          <span class="tips">关闭后用户完成任务上级无提成</span>
        </el-form-item>
        <el-form-item label="提成次数" size="medium">
          <el-input
            v-model="form.commissionNum"
            placeholder="同一个下级可获得提成次数"
          ></el-input>
        </el-form-item>
        <el-form-item label="提成等级" size="medium">
          <el-input
            v-model="form.commissionLevel"
            placeholder="企业用户购买单个激活码费用"
          ></el-input>
        </el-form-item>
        <el-form-item label="奖励模式" size="medium">
          <el-switch
            v-model="form.incentiveMode"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="按百分比"
            inactive-text="按固定额"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="奖励设置" size="medium">
          <el-input v-model="form.rewardSetting" placeholder="第1级"></el-input>
        </el-form-item>

        <el-divider></el-divider>

        <div class="title">新手红包：</div>
        <el-form-item label="开启红包" size="medium">
          <el-switch
            v-model="form.noviceEnvelope"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="开启红包（是）"
            inactive-text="开启红包（否）"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="红包金额" size="medium">
          <el-input
            v-model="form.envelopeNum"
            placeholder="0为(0-2)元范围内随机"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "memberNotice",
  data() {
    return {
      form: {
        canGetReward: true,
        inviteRewardMaster: "",
        inviteRewardDisciple: "",
        openCommission: true,
        commissionNum: "",
        commissionLevel: "",
        incentiveMode: false,
        rewardSetting: "",
        noviceEnvelope: "",
        envelopeNum: "",
      },
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
#memberNotice {
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
