<template>
  <div class="app-container">
    <el-form
      v-if="hisLogs.length > 0"
      ref="form"
      v-loading="loading"
      :model="form"
      style="color:black;"
      label-width="120px"
    >
      <el-form-item label="异动记录">
        <el-select v-model="value" placeholder="异动时间" @change="getform">
          <el-option
            v-for="item in hisLogs"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-divider />
      <el-form-item
        label="公司名称"
        :class="
          form.pre.displayName !== form.next.displayName ? 'change' : 'view'
        "
      >
        <el-input
          v-model="form.next.displayName"
          class="width520"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item
        label="法人代表"
        :class="
          form.pre.legalPerson !== form.next.legalPerson ? 'change' : 'view'
        "
      >
        <el-input
          v-model="form.next.legalPerson"
          class="width205"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item
        label="公司电话"
        :class="
          form.pre.phoneNumber !== form.next.phoneNumber ? 'change' : 'view'
        "
      >
        <el-input
          v-model="form.next.phoneNumber"
          class="width205"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item
        label="公司LOGO"
        :class="form.pre.logo !== form.next.logo ? 'change' : 'view'"
      >
        <img v-if="form.next.logo" :src="form.next.logo" class="avatar" />
      </el-form-item>
      <el-form-item
        label="邮箱"
        :class="form.pre.email !== form.next.email ? 'change' : 'view'"
      >
        <el-input v-model="form.next.email" class="width300" :disabled="true" />
      </el-form-item>
      <el-form-item
        label="公司地区"
        :class="form.pre.area !== form.next.area ? 'change' : 'view'"
      >
        <distPicker
          :province="province"
          :city="city"
          :area="area"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item
        label="公司地址"
        :class="form.pre.address !== form.next.address ? 'change' : 'view'"
      >
        <el-input
          v-model="form.next.address"
          type="textarea"
          class="width520"
          :disabled="true"
        />
      </el-form-item>
    </el-form>
    <div v-if="hisLogs.length == 0">
      <h5 style="color:red;">
        还没有异动记录哦~
      </h5>
    </div>
  </div>
</template>

<script>
import DistPicker from "@/components/Distpicker/Distpicker.vue";
import { getCompanyHisLog } from "@/api/organization.js";
import { getCompanyHisLogSelect } from "@/api/combobox.js";

export default {
  name: "OrganizationCompanyHisLog",
  components: { distPicker: DistPicker },
  data() {
    return {
      // 表单
      loading: false,
      form: { next: {}, pre: {} },
      // 地区
      province: "",
      city: "",
      area: "",
      hisLogs: [],
      value: ""
    };
  },
  created() {
    this.queryHisLogs();
  },
  methods: {
    // 获取表单信息
    getform() {
      this.loading = true;
      getCompanyHisLog({ dateTime: this.value }).then(res => {
        if (res.success) {
          this.form = res.result;
          if (!this.form.pre) {
            this.form.pre = this.form.next;
          }
          // 地区
          var arr = this.form.next.area.split("|");
          this.province = arr[0];
          this.city = arr[1];
          this.area = arr[2];
        } else {
          this.$message(res.error.message);
        }
        this.loading = false;
      });
    },
    queryHisLogs() {
      this.loading = true;
      getCompanyHisLogSelect().then(res => {
        var arr = [];
        res.result.forEach(element => {
          arr.push({
            value: element.creationTime,
            label: element.time
          });
        });
        this.hisLogs = arr;
        this.value = this.hisLogs[0].value;
        if (this.value) {
          this.getform();
        }
        this.loading = false;
      });
    }
  }
};
</script>

<style scoped>
.view >>> .el-input__inner,
.view >>> .el-textarea__inner {
  color: #606266 !important;
}
</style>
