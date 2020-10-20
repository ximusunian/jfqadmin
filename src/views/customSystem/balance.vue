<!--
 * @Description: 余额明细 -> 余额明细
 * @version: 
 * @Author: ximusunian
 * @Date: 2020-10-19 11:05:51
 * @LastEditors: ximusunian
 * @LastEditTime: 2020-10-19 14:09:21
-->
<template>
  <div id="balance">
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
        <el-select v-model="type" placeholder="请选择" size="small">
          <el-option
            v-for="item in typeOptions"
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
        ></el-table-column>
        <el-table-column label="用户编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="用户昵称" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column label="用户分组" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.group }}</template>
        </el-table-column>
        <el-table-column label="变动类型" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.type }}</template>
        </el-table-column>
        <el-table-column label="来源用户" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.source }}</template>
        </el-table-column>
        <el-table-column label="变动金额" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.amount }}</template>
        </el-table-column>
        <el-table-column label="账户余额" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.balance }}</template>
        </el-table-column>
        <el-table-column label="变动日期" max-width="135" align="center">
          <template slot-scope="scope">{{ scope.row.time }}</template>
        </el-table-column>
        <el-table-column label="备注信息" min-width="120" align="center">
          <template slot-scope="scope">{{ scope.row.notes }}</template>
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
        <el-button size="mini" type="danger" @click="deleteNotice" style="margin-left: 2rem">删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "balance",
  data() {
    return {
      options: [
        {
          value: "id",
          label: "搜用户id",
        },
        {
          value: "name",
          label: "搜用户昵称",
        },
        {
          value: "group",
          label: "搜用户组",
        },
      ],
      value: "id",
      searchValue: "",
      time: "",
      type: "",
      typeOptions: [
        {
          value: "任务奖励",
          label: "任务奖励",
        },
        {
          value: "首次分享",
          label: "首次分享",
        },
        {
          value: "新手红包",
          label: "新手红包",
        },
      ],

      tableData: [
        {
          id: "100152",
          username: "溪木素年",
          group: "普通用户",
          type: "首次分享",
          source: "溪木素年",
          amount: "100",
          balance: "200",
          time: "2020/10/16 9:42:35",
          notes: "今天首次分享获得奖励100金币",
        },
        {
          id: "100152",
          username: "溪木素年",
          group: "普通用户",
          type: "首次分享",
          source: "溪木素年",
          amount: "100",
          balance: "200",
          time: "2020/10/16 9:42:35",
          notes: "今天首次分享获得奖励100金币",
        },
        {
          id: "100152",
          username: "溪木素年",
          group: "普通用户",
          type: "首次分享",
          source: "溪木素年",
          amount: "100",
          balance: "200",
          time: "2020/10/16 9:42:35",
          notes: "今天首次分享获得奖励100金币",
        },
        {
          id: "100152",
          username: "溪木素年",
          group: "普通用户",
          type: "首次分享",
          source: "溪木素年",
          amount: "100",
          balance: "200",
          time: "2020/10/16 9:42:35",
          notes: "今天首次分享获得奖励100金币",
        },
        {
          id: "100152",
          username: "溪木素年",
          group: "普通用户",
          type: "首次分享",
          source: "溪木素年",
          amount: "100",
          balance: "200",
          time: "2020/10/16 9:42:35",
          notes: "今天首次分享获得奖励100金币",
        },
        {
          id: "100152",
          username: "溪木素年",
          group: "普通用户",
          type: "首次分享",
          source: "溪木素年",
          amount: "100",
          balance: "200",
          time: "2020/10/16 9:42:35",
          notes: "今天首次分享获得奖励100金币",
        },
        {
          id: "100152",
          username: "溪木素年",
          group: "普通用户",
          type: "首次分享",
          source: "溪木素年",
          amount: "100",
          balance: "200",
          time: "2020/10/16 9:42:35",
          notes: "今天首次分享获得奖励100金币",
        },
      ],
      multipleSelection: [],
      currentPage: 1,
      selection: [],
      deleteType: "checked",
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
        },
        {
          value: "all",
          label: "删除所有记录",
        }
      ]
    };
  },
  components: {},
  watch: {},
  mounted() {},
  methods: {
    select(selection, row) {
      this.selection = selection;
    },
    selectAll(selection) {
      this.selection = selection;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    deleteNotice() {
      console.log(this.selection);
    },
    changeStatus(status) {
      console.log(status);
    },
  },
};
</script>

<style scoped lang="scss">
#balance {
  .container-box {
    margin-top: 2rem;
    .pagination-box {
      margin-top: 2rem;
    }
    .operation-box {
      margin-top: 1.5rem;
    }
  }
}
</style>
