<template>
  <div class="app-container">
    <div>
      <el-row :span="20">
        <el-col align="right">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
          <el-input
            v-model="queryInfo.search"
            style="width:200px"
            placeholder="请输入内容"
          />
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="query"
          >
            查询
          </el-button>
        </el-col>
      </el-row>
    </div>
    <br />
    <el-table
      v-loading="loading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="标题" prop="title" width="300px" />
      <el-table-column align="center" width="60px" label="已读">
        <template slot-scope="scope">
          {{ scope.row.readed ? "是" : "否" }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="200px" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.creationTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="跳转链接">
        <template slot-scope="scope">
          <el-link @click="read(scope.row)">
            {{ scope.row.url }}
          </el-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="text-right">
      <pagination
        :total="total"
        :page.sync="pageIndex"
        :limit.sync="queryInfo.pageSize"
        @pagination="query"
      />
    </div>
  </div>
</template>

<script>
import { parseTime } from "@/utils/index";
import { getAnnoList, readAnno } from "@/api/message.js";
import Pagination from "@/components/Pagination";

export default {
  components: { Pagination },
  filters: {
    formatDate(time) {
      if (time) {
        return parseTime(new Date(time));
      }
    }
  },
  data() {
    return {
      loading: false,
      list: [],
      total: 0,
      pageIndex: 0,
      dateRange: null,
      queryInfo: {
        skillCount: 0,
        pageSize: 10,
        stime: null,
        etime: null,
        search: ""
      }
    };
  },
  watch: {
    dateRange(newVal) {
      if (newVal) {
        this.queryInfo.stime = this.dateRange[0];
        this.queryInfo.etime = this.dateRange[1];
      }
    }
  },
  created() {
    this.query();
  },
  methods: {
    query() { 
      this.loading = true;
      getAnnoList(this.queryInfo)
        .then(res => {
          if (res.success) {
            this.list = res.result.items;
            this.total = res.result.totalCount;
          } else {
            this.$message({
              message: res.error.message,
              type: "error"
            });
          }
          this.loading = false;
        })
        .catch(error => {
          console.log(error.message);
          this.loading = false;
        });
    },
    read(row) {
      readAnno([row.id]);
      window.open(row.url, "_blank");
    }
  }
};
</script>
