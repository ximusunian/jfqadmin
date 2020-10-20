<template>
  <div class="app-container">
    <div class="text-left">
      <div class="dis-flex-between mb10">
        <div>
          <el-button
            v-if="permissionList.Organization_Department_Add"
            type="primary"
            size="mini"
            @click="create"
          >
            新增
          </el-button>
        </div>
        <div class="dis-flex-between">
          <!-- <el-checkbox v-model="checked">
            启用
          </el-checkbox>
          <span>&nbsp;&nbsp;</span> -->
          <el-input v-model.trim="search" placeholder="名称" />
        </div>
      </div>
    </div>
    <br />

    <el-table
      v-loading="loading"
      :data="clist"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :expand-row-keys="expand"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column label="名称" align="left" prop="displayName" />
      <el-table-column label="类别" align="center" prop="typeName" />
      <el-table-column label="负责人" align="center" prop="leaderName" />
      <el-table-column label="成员" align="center" prop="num" />
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            v-if="permissionList.Organization_Department_Upd"
            type="primary"
            size="mini"
            @click.native="update(scope.row.index, scope.row)"
          >
            编辑
          </el-button>
          <el-button
            v-if="permissionList.Organization_Department_Upd"
            type="danger"
            size="mini"
            @click.native="deleted(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <create :visible.sync="createVisible" :success="query" />
    <update :id="id" :visible.sync="updateVisible" :success="query" />
  </div>
</template>

<script>
import { getTreeData, deleteDepartment } from "@/api/organization";
import Create from "@/views/organization/department/create.vue";
import Update from "@/views/organization/department/update.vue";
import { localStorageManager } from "@/utils/storage";

export default {
  name: "OrganizationDepartment",
  components: {
    create: Create,
    update: Update
  },
  data() {
    return {
      permissionList: [],
      checked: true,
      search: "",
      loading: false,
      list: [],
      copylist: [],
      createVisible: false,
      updateVisible: false,
      id: 0,
      expand: []
    };
  },
  computed: {
    clist() {
      return this.filterNode();
    }
  },
  created() {
    this.query();
    // 权限
    var arr = this.$store.getters.permissions;
    this.permissionList.Organization_Department_Add = arr.includes(
      "Organization_Department_Add"
    );
    this.permissionList.Organization_Department_Upd = arr.includes(
      "Organization_Department_Upd"
    );
    this.permissionList.Organization_Department_Del = arr.includes(
      "Organization_Department_Del"
    );
  },
  methods: {
    query() {
      this.loading = true;
      getTreeData()
        .then(res => {
          if (res.success) {
            this.list = res.result;
            this.copylist = JSON.parse(JSON.stringify(res.result));
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
          deleteDepartment({ id: row.id }).then(res => {
            if (res.success) {
              this.$notify({
                title: "Success",
                message: "删除成功",
                type: "success",
                duration: 2000
              });
              localStorageManager.removeStorage("department");
              this.query();
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
    },
    filterNode() {
      var _obj = JSON.stringify(this.copylist);
      this.list = JSON.parse(_obj);
      this.expand = [];
      if (this.search) {
        if (this.list) {
          var result = [];
          this.list.forEach(item => {
            var node = this.filterChildNode(item);
            if (node) {
              if (this.checked) {
                if (node.isActive) {
                  result.push(node);
                }
              } else {
                result.push(node);
              }
            }
          });
          return result;
        }
      }
      return this.list;
    },
    filterChildNode(node) {
      if (node) {
        var exist = node.displayName.indexOf(this.search) !== -1;
        // 查找子部门
        if (node.children && node.children.length) {
          var clist = [];
          node.children.forEach(child => {
            var cnode = this.filterChildNode(child);
            if (cnode) {
              if (this.checked) {
                if (cnode.isActive) {
                  clist.push(cnode);
                }
              } else {
                clist.push(cnode);
              }
            }
          });
          node.children = clist;
        }
        if (exist || (node.children != null && node.children.length > 0)) {
          this.expand.push("" + node.id);
          return node;
        }
        return null;
      }
    }
  }
};
</script>
