<template>
  <div class="app-container">
    <el-button
      :disabled="!permissionList.Users_Admin_Jobs_Restart"
      size="mini"
      type="primary"
      @click="restartJobs"
    >重新启动</el-button>
    <!-- Note that row-key is necessary to get a correct row order. -->
    <el-table
      class="mt10 mb10 border1-e1e1e1"
      ref="dragTable"
      v-loading="listLoading"
      :data="list"
      row-key="id"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="任务ID" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="任务标识">
        <template slot-scope="scope">
          <span>{{ scope.row.jobKey }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="任务名称">
        <template slot-scope="scope">
          <span>{{ scope.row.jobName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="定时时间">
        <template slot-scope="scope">
          <span>{{ scope.row.schedulerTime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="开始执行时间">
        <template slot-scope="scope">
          <span>{{ scope.row.startTime | dateformat }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="结束执行时间">
        <template slot-scope="scope">
          <span>{{ scope.row.endTime | dateformat }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" class-name="status-col" label="是否启用">
        <template slot-scope="scope">
          <span>{{ scope.row.isUsed | statusFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="row">
          <el-button
            :disabled="!permissionList.Users_Admin_Jobs_Edit"
            type="primary"
            size="mini"
            @click="handleEdit(row.row)"
          >编辑</el-button>
          <el-button
            :disabled="!permissionList.Users_Admin_Jobs_StartNow"
            v-if="row.status!='published'"
            size="mini"
            type="success"
            @click="handleStartNow(row.row)"
          >立即启动</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑任务" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="curTask"
        label-position="left"
        label-width="100px"
      >
        <el-form-item label="任务标识" prop="jobKey">
          <el-input v-model="curTask.jobKey" />
        </el-form-item>
        <el-form-item label="任务名称" prop="jobName">
          <el-input v-model="curTask.jobName" />
        </el-form-item>
        <el-form-item label="计划时间" prop="schedulerTime">
          <el-input v-model="curTask.schedulerTime" />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="curTask.isUsed" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateJobData()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Sortable from "sortablejs";
import {
  getjoblist,
  updjob,
  editjob,
  startjob,
  restartall
} from "@/api/backjobs";
import { parseTime, showNotification } from "@/utils";
import { fail } from 'assert';

export default {
  name: "backjobs",
  filters: {
    statusFilter(status) {
      const statusMap = {
        false: "关闭",
        true: "启动"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      list: null,
      dialogFormVisible: false,
      curTask: {},
      listLoading: false,
      permissionList: {},
      listQuery: {
        page: 1,
        limit: 10
      },
      sortable: null,
      rules: {
        jobKey: [
          { required: true, message: "任务标识不能为空", trigger: "change" }
        ],
        jobName: [
          { required: true, message: "任务名称不能为空", trigger: "change" }
        ],
        schedulerTime: [
          {
            required: true,
            message: "任务计划时间（Cron表达式）不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  }, 
  created() {
    this.getList();
    this.setPermisson();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      getjoblist().then(res => {
        this.list = res.result;
      });
      this.listLoading = false;

      this.$nextTick(() => {
        this.setSort();
      }).catch(err=>{
        this.listLoading = false;
      });
    },
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll(
        ".el-table__body-wrapper > table > tbody"
      )[0];
      this.sortable = Sortable.create(el, {
        ghostClass: "sortable-ghost", // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData("Text", "");
        },
        onEnd: evt => {
          const targetRow = this.list.splice(evt.oldIndex, 1)[0];
          this.list.splice(evt.newIndex, 0, targetRow);
 
        }
      });
    },
    restartJobs() {
      this.$confirm("将重启所有任务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          restartall().then(res => {
            if (res.success) {
              showNotification(this, res.result.data, "");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重启"
          });
        });
    },
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.curTask = row;
    },
    handleStartNow(row) {
      this.$confirm("将立即启动任务【"+row.jobName+"】， 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          startjob(row).then(res => {
            if (res.success) {
              showNotification(this, "", res.result.data);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消启动"
          });
        });
    },
    updateJobData() { 
      editjob(this.curTask).then(res => {
        if (res.success) {
          showNotification(this, "", "修改成功！");
        }
        this.dialogFormVisible = false;
      });
    },
    setPermisson() {
      var arr = this.$store.getters.permissions;
      this.permissionList.Users_Admin_Jobs_Edit = arr.includes(
        "Users_Admin_Jobs_Edit"
      );
      this.permissionList.Users_Admin_Jobs_StartNow = arr.includes(
        "Users_Admin_Jobs_StartNow"
      );
      this.permissionList.Users_Admin_Jobs_Restart = arr.includes(
        "Users_Admin_Jobs_Restart"
      );
    }
  }
};
</script>

<style>
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #42b983 !important;
}
</style>

<style scoped>
.icon-star {
  margin-right: 2px;
}
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.show-d {
  margin-top: 15px;
}
</style>
