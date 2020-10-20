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
      v-loading="listLoading"
      :data="list"
      row-key="id"
      :key="randomkey"
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

      <el-table-column align="center" label="最终执行结果">
        <template slot-scope="scope">
          <span>{{ scope.row.preResult }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" class-name="status-col" label="是否启用">
        <template slot-scope="scope">
          <span>{{ scope.row.isUsed | statusFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"   label="操作">
        <template slot-scope="row">
          <el-button
            :disabled="!permissionList.Users_Admin_Jobs_Edit"
            type="primary"
            size="mini"
            @click="handleEdit(row.row)"
          >编辑</el-button>
          <!-- <el-button
            :disabled="!permissionList.Users_Admin_Jobs_StartNow"
            v-if="row.status!='published'"
            size="mini"
            type="success"
            @click="handleStartNow(row.row)"
          >重置</el-button> -->
           <el-button
            :disabled="!permissionList.Users_Admin_Jobs_StartNow"
            v-if="row.status!='published'"
            size="mini"
            type="success" 
            @click="handleStartImePre(row.row)"
          >启动</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑任务" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
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

     <el-dialog title="选择时间段" :visible.sync="datePickVisible" :close-on-click-modal="false">
       <el-date-picker
      class="mt10"
      v-model="dataRange"
      size="mini"
      type="daterange"
      align="right"
      value-format="yyyy-MM-dd"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
      @change="selectDate"
    ></el-date-picker>
      <div slot="footer" class="dialog-footer">
        <el-button @click="datePickVisible = false">取消</el-button>
        <el-button type="primary" :loading="jobRunLoading" @click="handleStartIme()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getjoblist,
  updjob,
  editjob,
  startjob,
  restartall,
  startIme
} from "@/api/backjobs";
import { parseTime, isEmpty,showNotification,checkDateOutOf } from "@/utils";
 

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
      list: [],
      dialogFormVisible: false,
      datePickVisible:false,
      jobRunLoading:false, 
      curTask: {},
      randomkey: 0,
      curRow:{},
      dataRange:[],
      Bdate:'',
      Edate:'',
      listLoading: false,
      permissionList: {},
       pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
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
    getList() {
      this.listLoading = true;
      getjoblist().then(res => {
        this.list = res.result; 
        this.randomkey = Math.random();
        this.listLoading = false;
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
      this.$confirm(
        "将立即重置任务【" + row.jobName + "】， 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
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
    handleStartImePre(row){
      this.curRow = row;
      this.datePickVisible = true;
    },
    handleStartIme(){ 

      this.jobRunLoading = true;
       this.$confirm(
        "将立即启动任务【" + this.curRow.jobName + "】， 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          var inputData={
            jobKey:this.curRow.jobKey,
            bdate:this.Bdate,
            edate:this.Edate
          }; 
          startIme(inputData).then(res => { 
            if (res.success) {
              showNotification(this, "", res.result.data);
            }
            this.datePickVisible = false;
            this.jobRunLoading = false;
          }).catch(error=>{ 
            this.datePickVisible = false;
            this.jobRunLoading = false;
          });
        })
        .catch((err) => { 
           this.jobRunLoading = false;
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
    selectDate(val) {
      if (!isEmpty(val)) {
        //checkDateOutOf(this, new Date(val[1]), isOutDate => {
          this.Bdate = val[0];
          this.Edate = val[1];  
          this.dataRange =val;
       // });
      }
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
