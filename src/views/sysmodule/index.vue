<template>
  <div class="app-container">
    <el-row> 
      <el-col :span="3">
        <el-input
          size="mini"
          v-model="filterInputs.keyword"
          placeholder="模块标识或者名称"
          style="width:200px"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
      </el-col>
      <el-col :span="6">
        <el-button
          class="filter-item"
          type="primary"
          style="margin-left: 10px;"
          size="mini"
          icon="el-icon-search"
          @click="handleFilter"
        >搜索</el-button>
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          size="mini"
          icon="el-icon-edit"
          @click="handleReset"
        >重置</el-button>
      </el-col>
    </el-row>
    <div class="dis-flex-right">
      <el-button
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >创建</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="settinglist"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="标识" align="center">
        <template slot-scope="{row}">
          <span>{{row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.displayName}}</span>
        </template>
      </el-table-column> 
      <el-table-column label="操作" align="center" width="315" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="edit(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="totalCount>0"
      :total="totalCount"
      :page.sync="filterInputs.pageIndex"
      :limit.sync="filterInputs.pageSize"
      @pagination="getlist"
    />
    <Model  :visible.sync="modelVisible" :openType="openType" :form-data="currentRow" :success="getlist"/>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import { list } from "@/api/sysmodule";
import Model from "@/views/sysmodule/components/Model"
export default {
  name: "setting",
  components: {
    Pagination,
    Model
  },
  data() {
    return { 
      openType:'create',
      modelVisible:false,
      currentRow:{},
      totalPage: 0,
      totalCount: 0,
      settinglist: [],
      listLoading: false,
      filterInputs: {
        keyword: "", 
        pageIndex: 1,
        pageSize: 20
      }
    };
  }, 
  created(){
    this.getlist();
  },
  methods: {
    handleCreate() { 
      this.openType = 'create';
      this.currentRow = {};
      this.modelVisible = true;
    },
    edit(row) {
      this.openType = 'update';
      this.currentRow = row;
      this.modelVisible = true;
    },
    handleFilter() {
      this.filterInputs.pageIndex = 1;
      this.getlist();
    },
    getlist() {
      var reqData = this.filterInputs;

      this.listLoading = true;
      list(reqData)
        .then(res => {
          this.settinglist = res.result.items; 
          this.totalPage = res.result.totalPage;
          this.totalCount = res.result.totalCount;
          this.listLoading = false;
        })
        .catch(err => {
          this.listLoading = false;
        });
    },
    handleReset(){
      this.filterInputs.keyword=""; 
    }
  }
};
</script>