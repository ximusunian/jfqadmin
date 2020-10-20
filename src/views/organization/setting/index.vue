<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card v-loading="positionTypeLoading" class="box-card">
            <div slot="header" class="clearfix">
              <span style="font-weight:bold">职位类别设置</span>
              <el-button
                v-if="permissionList.Organization_Position_Setting_Add"
                type="primary"
                size="mini"
                style="float: right;"
                @click="createType"
              >
                新增
              </el-button>
            </div>
            <div
              v-for="(item, index) in typeList"
              :key="item.id"
              v-loading="positionTypeLoading"
              class="text item"
            >
              <div>
                <span>{{ item.displayName }}</span>
                <span style="float: right;">
                  <el-button
                    v-if="permissionList.Organization_Position_Setting_Upd"
                    type="primary"
                    size="mini"
                    @click.native="updateType(index, item)"
                  >
                    编辑
                  </el-button>
                  <el-button
                    v-if="permissionList.Organization_Position_Setting_Del"
                    type="danger"
                    size="mini"
                    @click="deletedType(item)"
                  >
                    删除
                  </el-button>
                </span>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card v-loading="positionLevelLoading" class="box-card">
            <div slot="header" class="clearfix">
              <span style="font-weight:bold">职位等级设置</span>
              <el-button
                v-if="permissionList.Organization_Position_Setting_Add"
                type="primary"
                style="float: right;"
                @click="createLevel"
              >
                新增
              </el-button>
            </div>
            <div
              v-for="(item, index) in levelList"
              :key="item.id"
              v-loading="positionLevelLoading"
              class="text item"
            >
              <div>
                <span>{{ item.displayName }}</span>
                <span style="float: right;">
                  <el-button
                    v-if="permissionList.Organization_Position_Setting_Upd"
                    type="primary"
                    size="mini"
                    @click.native="updateLevel(index, item)"
                  >
                    编辑
                  </el-button>
                  <el-button
                    v-if="permissionList.Organization_Position_Setting_Del"
                    type="danger"
                    size="mini"
                    @click="deletedLevel(item)"
                  >
                    删除
                  </el-button>
                </span>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <createType
      :visible.sync="createTypeVisible"
      :success="createTypeCallback"
    />
    <updateType
      :id="typeId"
      :visible.sync="updateTypeVisible"
      :index="typeIndex"
      :success="updateTypeCallback"
    />
    <createLevel
      :visible.sync="createLevelVisible"
      :success="createLevelCallback"
    />
    <updateLevel
      :id="levelId"
      :visible.sync="updateLevelVisible"
      :index="levelIndex"
      :success="updateLevelCallback"
    />
  </div>
</template>

<script>
import {
  getListPositionType,
  deletePositionType,
  getListPositionLevel,
  deletePositionLevel
} from "@/api/organization";
import CreateType from "@/views/organization/setting/createType.vue";
import UpdateType from "@/views/organization/setting/updateType.vue";
import CreateLevel from "@/views/organization/setting/createLevel.vue";
import UpdateLevel from "@/views/organization/setting/updateLevel.vue";

export default {
  name: "OrganizationSetting",
  components: {
    createType: CreateType,
    updateType: UpdateType,
    createLevel: CreateLevel,
    updateLevel: UpdateLevel
  },
  data() {
    return {
      positionLevelLoading: false,
      positionTypeLoading: false,
      permissionList: [],
      typeList: [],
      typeId: 0,
      typeIndex: 0,
      createTypeVisible: false,
      updateTypeVisible: false,
      levelList: [],
      levelId: 0,
      levelIndex: 0,
      createLevelVisible: false,
      updateLevelVisible: false
    };
  },
  created() {
    this.queryType();
    this.queryLevel();
    // 权限
    var arr = this.$store.getters.permissions;
    this.permissionList.Organization_Position_Setting_Add = arr.includes(
      "Organization_Position_Setting_Add"
    );
    this.permissionList.Organization_Position_Setting_Upd = arr.includes(
      "Organization_Position_Setting_Upd"
    );
    this.permissionList.Organization_Position_Setting_Del = arr.includes(
      "Organization_Position_Setting_Del"
    );
  },
  methods: {
    queryType() {
      this.positionTypeLoading = true;
      getListPositionType()
        .then(res => {
          if (res.success) {
            this.typeList = res.result;
          } else {
            this.$message({
              message: res.error.message,
              type: "error"
            });
          }
          this.positionTypeLoading = false;
        })
        .catch(err => {
          this.positionTypeLoading = false;
        });
    },
    createType() {
      this.createTypeVisible = true;
    },
    createTypeCallback(item) {
      this.typeList.push(item);
    },
    updateType(index, item) {
      this.updateTypeVisible = true;
      this.typeIndex = index;
      this.typeId = item.id;
    },
    updateTypeCallback(index, item) {
      this.$set(this.typeList, index, item);
    },
    deletedType(item) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deletePositionType({ id: item.id }).then(res => {
            if (res.success) {
              this.$notify({
                title: "Success",
                message: "删除成功",
                type: "success",
                duration: 2000
              });
              const index = this.typeList.indexOf(item);
              this.typeList.splice(index, 1);
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
    queryLevel() {
      this.positionLevelLoading = true;
      getListPositionLevel({})
        .then(res => {
          if (res.success) {
            this.levelList = res.result;
          } else {
            this.$message({
              message: res.error.message,
              type: "error"
            });
          }
          this.positionLevelLoading = false;
        })
        .catch(err => {
          this.positionLevelLoading = false;
        });
    },
    createLevel() {
      this.createLevelVisible = true;
    },
    createLevelCallback(item) {
      this.levelList.push(item);
    },
    updateLevel(index, item) {
      this.updateLevelVisible = true;
      this.levelIndex = index;
      this.levelId = item.id;
    },
    updateLevelCallback(index, item) {
      this.$set(this.levelList, index, item);
    },
    deletedLevel(item) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deletePositionLevel({ id: item.id }).then(res => {
            if (res.success) {
              this.$notify({
                title: "Success",
                message: "删除成功",
                type: "success",
                duration: 2000
              });
              const index = this.levelList.indexOf(item);
              this.levelList.splice(index, 1);
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

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 600px;
}
</style>
