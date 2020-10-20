<template>
  <div class="app-container">
    <div class="text-left">
      <div class="dis-flex-between mb10">
        <div>
          <el-button
            v-if="permissionList.Organization_Legal_Add"
            type="primary"
            size="mini"
            @click="create"
          >
            新增
          </el-button>
        </div>
        <div class="dis-flex-between">
          <div class="mr20 width180">
            <el-input
              v-model="queryInfo.displayName"
              placeholder="名称"
              @keyup.enter.native="query"
            />
          </div>
          <div class="mr20 width180">
            <el-input
              v-model="queryInfo.legalPerson"
              placeholder="法人"
              @keyup.enter.native="query"
            />
          </div>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="query"
          >
            查询
          </el-button>
        </div>
      </div>
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
      <el-table-column align="center" label="ID" width="95" prop="id" />
      <el-table-column label="名称" prop="displayName" />
      <el-table-column
        label="法人"
        width="95"
        align="center"
        prop="legalPerson"
      />
      <el-table-column
        label="统一社会信用代号"
        width="150"
        align="center"
        prop="code"
      />
      <el-table-column
        label="公司地址"
        width="300"
        align="center"
        prop="address"
      />
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            v-if="permissionList.Organization_Legal_Upd"
            type="primary"
            size="mini"
            @click.native="update(scope.row.index, scope.row)"
          >
            编辑
          </el-button>
          <el-button
            v-if="permissionList.Organization_Legal_Del"
            type="danger"
            size="mini"
            @click="deleted(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="text-right">
      <pagination
        :total="total"
        :page.sync="queryInfo.pageIndex"
        :limit.sync="queryInfo.pageSize"
        @pagination="query"
      />
    </div>
    <create :visible.sync="createVisible" :success="query" />
    <update :id="id" :visible.sync="updateVisible" :success="query" />
  </div>
</template>

<script>
import { getListLegal, deleteLegal } from "@/api/organization.js";
import Pagination from "@/components/Pagination";
import Create from "@/views/organization/legal/create.vue";
import Update from "@/views/organization/legal/update.vue";

export default {
  name: "OrganizationLegal",
  components: {
    pagination: Pagination,
    create: Create,
    update: Update
  },
  data() {
    return {
      permissionList: [],
      total: 0,
      queryInfo: {
        pageIndex: 1,
        pageSize: 10,
        displayName: "",
        legalPerson: ""
      },
      loading: false,
      list: [],
      id: 0,
      index: 0,
      createVisible: false,
      updateVisible: false
    };
  },
  created() {
    this.query();
    // 权限
    var arr = this.$store.getters.permissions;
    this.permissionList.Organization_Legal_Add = arr.includes(
      "Organization_Legal_Add"
    );
    this.permissionList.Organization_Legal_Upd = arr.includes(
      "Organization_Legal_Upd"
    );
    this.permissionList.Organization_Legal_Del = arr.includes(
      "Organization_Legal_Del"
    );
  },
  methods: {
    query() {
      this.loading = true;
      getListLegal(this.queryInfo)
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
        .catch(err => {
          this.loading = false;
        });
    },
    create() {
      this.createVisible = true;
    },
    update(index, row) {
      this.updateVisible = true;
      this.id = row.id;
      this.index = index;
    },
    deleted(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteLegal({ id: row.id }).then(res => {
            if (res.success) {
              this.$notify({
                title: "Success",
                message: "删除成功",
                type: "success",
                duration: 2000
              });
              const index = this.list.indexOf(row);
              this.list.splice(index, 1);
            } else {
              this.$message({
                message: "删除失败",
                type: "error"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
