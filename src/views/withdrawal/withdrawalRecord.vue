<!--
 * @Description: 用户提现 -> 提现记录
 * @version: 
 * @Author: ximusunian
 * @Date: 2020-10-19 15:38:00
 * @LastEditors: ximusunian
 * @LastEditTime: 2020-10-19 17:22:17
-->
<template>
  <div id="withdrawalRecord">
    <div class="mb-1 pt-1 el-row">
      <div class="el-col el-col-10" style="display: flex; align-items: center">
        <span>搜索类型：</span>
        <el-select v-model="value" placeholder="请选择" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="el-col el-col-7" style="display: flex; align-items: center">
        <span style="min-width: 6rem">搜索关键词：</span>
        <el-input
          v-model="searchValue"
          size="small"
          placeholder="请填写要搜索的关键词"
        ></el-input>
      </div>
    </div>
    <div class="mb-1 pt-1 el-row" style="margin-top: 1rem">
      <div class="el-col el-col-10">
        <span class="demonstration">查询日期：</span>
        <el-date-picker
          v-model="time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
        >
        </el-date-picker>
      </div>
      <div class="el-col el-col-7" style="display: flex; align-items: center">
        <span>明细类型：</span>
        <el-select v-model="status" placeholder="请选择" size="small">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="mb-1 pt-1 el-row" style="margin-top: 2rem">
      <el-button type="primary" icon="el-icon-search" size="medium"
        >快速查找</el-button
      >
    </div>

    <div class="warning-box">
      <i class="el-alert__icon el-icon-warning"></i>
      <div class="warning-txt">
        <p>实际金额：不含手续费,提现金额：含手续费</p>
      </div>
    </div>

    <div class="container-box">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @select="select"
        @select-all="selectAll"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
          fixed
        ></el-table-column>
        <el-table-column label="提现用户" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column label="订单编号" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.orderId }}</template>
        </el-table-column>
        <el-table-column label="实际金额" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.actualAmount }}</template>
        </el-table-column>
        <el-table-column label="提现金额" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.withdrawalAmount }}</template>
        </el-table-column>
        <el-table-column label="提后余额" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.balance }}</template>
        </el-table-column>
        <el-table-column label="提现次数" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.withdrawalNum }}</template>
        </el-table-column>
        <el-table-column label="提现日期" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.withdrawalTime }}</template>
        </el-table-column>
        <el-table-column label="处理日期" max-width="135" align="center">
          <template slot-scope="scope">{{ scope.row.processingTime }}</template>
        </el-table-column>
        <el-table-column label="收款方式" min-width="120" align="center">
          <template slot-scope="scope">{{ scope.row.paymentTerm }}</template>
        </el-table-column>
        <el-table-column label="账号" min-width="120" align="center">
          <template slot-scope="scope">{{ scope.row.account }}</template>
        </el-table-column>
        <el-table-column label="订单状态" min-width="120" align="center">
          <template slot-scope="scope">{{ scope.row.status }}</template>
        </el-table-column>
        <el-table-column label="操作选项" min-width="120" align="center">
          
        </el-table-column>
      </el-table>

      <div class="pagination-box">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </div>

      <div class="operation-box">
        <el-select v-model="deleteType" placeholder="请选择" size="small">
          <el-option
            v-for="item in deleteTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button size="mini" type="danger" @click="deleteData" style="margin-left: 2rem">删除数据</el-button>
        <el-button size="mini" type="primary" @click="changeStatus(true)">同意提现（是）</el-button>
        <el-button size="mini" type="warning" @click="changeStatus(false)">同意提现（否）</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "withdrawalRecord",
  data() {
    return {
      options: [
        {
          value: "orderId",
          label: "搜订单号",
        },
        {
          value: "id",
          label: "搜用户id",
        },
        {
          value: "name",
          label: "搜用户昵称",
        },
      ],
      value: "orderId",
      searchValue: "",
      time: "",
      status: "",
      statusOptions: [
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
      tableData: [
        {
          username: '',
          orderId: '',
          actualAmount: '',
          withdrawalAmount: '',
          balance: '',
          withdrawalNum: '',
          withdrawalTime: '',
          processingTime: '',
          paymentTerm: '',
          account: '',
          status: ''
        }
      ],
      currentPage: 1,
      deleteType: 'checked',
      deleteTypeOptions: [
        {
          value: "checked",
          label: "删除选中的数据",
        },
        {
          value: "day",
          label: "删除一天前的记录",
        },
        {
          value: "week",
          label: "删除一周前的记录",
        },
        {
          value: "month",
          label: "删除一月前的记录",
        },
        {
          value: "halfYear",
          label: "删除半年前的记录",
        },
        {
          value: "year",
          label: "删除一年前的记录",
        }
      ]
    };
  },
  components: {},
  watch: {},
  mounted() {},
  methods: {
    handleSelectionChange() {

    },
    select() {

    },
    selectAll() {

    },
    handleSizeChange() {},
    handleCurrentChange() {},
    deleteData() {},
    changeStatus(status) {
      console.log(status);
    }
  },
};
</script>

<style scoped lang="scss">
#withdrawalRecord {
  .warning-box {
    margin-top: 1rem;
    background-color: #fdf6ec;
    color: #e6a23c;
    width: 100%;
    padding: 8px 16px;
    box-sizing: border-box;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    opacity: 1;
    display: flex;
    align-items: center;
    .warning-txt {
      display: table-cell;
      padding: 0 8px;
      p {
        margin: 0.3rem;
        padding: 0;
      }
    }
  }
  .container-box {
    margin-top: 1rem;
  }
  .pagination-box {
    margin-top: 1rem;
  }
  .operation-box {
    margin-top: 1rem;
  }
}
</style>
