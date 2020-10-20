<!--
 * @Description: 系统公告 -> 用户公告
 * @version: 
 * @Author: ximusunian
 * @Date: 2020-10-16 14:17:39
 * @LastEditors: ximusunian
 * @LastEditTime: 2020-10-16 16:42:56
-->
<template>
  <div id="userNotice">
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
      <el-table-column label="公告内容" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="添加日期"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="sort"
        label="显示排序"
        show-overflow-tooltip
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column label="显示状态" width="120" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作选项" width="150" align="center">
        <template slot-scope="">
          <el-button size="mini">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            >删除</el-button
          >
        </template>
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
      <el-button size="mini" type="danger" @click="deleteNotice">删除</el-button>
      <el-button size="mini" type="primary" @click="changeStatus(true)">允许显示（是）</el-button>
      <el-button size="mini" type="warning" @click="changeStatus(false)">允许显示（否）</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "userNotice",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          status: false,
          sort: "0",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          status: false,
          sort: "0",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          status: false,
          sort: "0",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          status: false,
          sort: "0",
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          status: false,
          sort: "0",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          status: false,
          sort: "0",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          status: false,
          sort: "0",
        },
      ],
      multipleSelection: [],
      currentPage: 1,
      selection: []
    };
  },
  components: {},
  watch: {},
  mounted() {},
  methods: {
    select(selection, row) {
      this.selection = selection
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
    }
  },
};
</script>

<style scoped lang="scss">
#userNotice {
  .pagination-box {
    margin-top: 1.5rem;
  }
  .operation-box {
    margin-top: 1.5rem;
  }
}
</style>
