 
<template>
  <div class="app-container">
    <el-button
      :disabled="!permissionList.Users_Admin_Rose_Add"
      size="mini"
      type="primary"
      @click="modifyRoleInfo"
    >新增</el-button>
    <el-button size="mini" type="success" @click="selectPage(1)">刷新</el-button>
    <el-table
      v-loading="isLoading"
      class="mt10 mb10 border1-e1e1e1"
      border
      :data="roleList"
      style="text-align: left;"
    >
      <el-table-column label="ID序号" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="显示名称" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.displayName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="角色名称" min-width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="280">
        <template slot-scope="scope">
          <el-button
            :disabled="!permissionList.Users_Admin_Rose_SetPermission"
            size="mini"
            type="primary"
            @click="setPermission(scope.row)"
          >数据授权</el-button>
          <el-button
            :disabled="!permissionList.Users_Admin_Rose_Upd"
            size="mini"
            type="success"
            @click="modifyRoleInfo(scope.$index, scope.row)"
          >编辑角色</el-button>
          <el-button
            :disabled="!permissionList.Users_Admin_Rose_Del"
            size="mini"
            type="danger"
            @click="deleteRole(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="selectPage"
      :page-size="perPage"
      :total="totalCount"
    ></el-pagination>

    <el-dialog :title="(isModified?'编辑':'新增')+'数据权限'" :visible.sync="isShowModifyRoleDialog">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="ruleForm.name" auto-complete="off" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="显示名称" :label-width="formLabelWidth" prop="displayName">
          <el-input v-model="ruleForm.displayName" auto-complete="off" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth" prop="description">
          <el-input v-model="ruleForm.description" auto-complete="off" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item class="text-left" label="默认角色" :label-width="formLabelWidth">
          <el-radio v-model="isDefaultRole" label="false">否</el-radio>
          <el-radio v-model="isDefaultRole" label="true">是</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer text-center">
        <el-button class="mr40 width120" @click="isShowModifyRoleDialog = false">取 消</el-button>
        <el-button
          class="ml40 width120"
          type="primary"
          @click="configModifyRole(ruleForm,'ruleForm')"
        >确 定</el-button>
      </div>
    </el-dialog>

    <DialogBase :dialogInfo="dialogInfo" @confirmHandle="confirmHandle" />
    <el-dialog
      :visible.sync="roleDialogVisible"
      :fullscreen="true"
      :title="'编辑权限:'+curRole.displayName"
    >
      <el-form
        :model="curRole"
        label-width="80px"
        label-position="left"
        :rules="datapermissionRules"
      >
        <el-form-item label="功能模块" prop="sysmoduleId">
          <el-select :value="curModuleId" filterable @change="modulevaluechange" placeholder="功能模块">
            <el-option
              v-for="item in dataModules"
              :key="item.id"
              :label="item.displayName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-divider content-position="left">部门</el-divider>
        <div class="tagList">
          <div v-for="(item, index) in curDepartmentList" :key="index">
            <el-tag
              :key="item.MapId"
              effect="plain"
              closable
              style="margin:0 0 10px 10px;"
              :type="GetTagStyle(item.type)"
              @close="
                  handleDeptDelete(item)
                "
            >{{ item.MapName }}</el-tag>
          </div>
        </div>
        <div class="text-left" style="margin:0 0 10px 10px;">
          <Department ref="dept" @change="deptChange" v-model="selectedDept" :returnItem="true" />
          <el-button
            style="margin:0 0 10px 10px;"
            type="primary"
            size="mini"
            :disabled="!moduleSelected"
            @click="handleAddDepartment"
          >添加部门</el-button>
        </div>

        <el-divider content-position="left">账号组</el-divider>
        <div class="tagList">
          <div v-for="(item, index) in curWechatGroupList" :key="index">
            <el-tag
              :key="item.MapId"
              effect="plain"
              closable
              style="margin:0 0 10px 10px;"
              :type="GetTagStyle(item.type)"
              @close="
                  handleGroupDelete(item)
                "
            >{{ item.MapName }}</el-tag>
          </div>
        </div>
        <div class="text-left" style="margin:0 0 10px 10px;">
          <!-- <MutiWechatAccountGroup
            v-model="selectedGroupList"
            :collapsetags="true"
            :clearable="true"
            :returnItem="true"
            :filterable="true"
          /> -->
          <el-button
            style="margin:0 0 10px 10px;"
            type="primary"
            size="mini"
            @click="handleAddGroup"
            :disabled="!moduleSelected"
          >添加组</el-button>
        </div>
        <el-divider content-position="left">标签</el-divider>
        <div class="tagList">
          <div v-for="(item, index) in curLabelList" :key="index">
            <el-tag
              :key="item.MapId"
              effect="plain"
              closable
              :type="GetTagStyle(item.type)"
              style="margin:0 0 10px 10px;"
              @close="
                  handleLabelDelete(item)
                "
            >{{ item.MapName }}</el-tag>
          </div>
        </div>
        <div class="text-left" style="margin:0 0 10px 10px;">
          <!-- <MutiWechatAccountTags
            v-model="selectedLabelList"
            :collapsetags="true"
            :clearable="true"
            :returnItem="true"
            :filterable="true"
          /> -->
          <el-button
            style="margin:0 0 10px 10px;"
            type="primary"
            size="mini"
            :disabled="!moduleSelected"
            @click="handleAddLabel"
          >添加标签</el-button>
        </div>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="roleDialogVisible=false">关闭</el-button>
        <el-button
          type="primary"
          :disabled="!moduleSelected"
          v-loading="saveloading"
          @click="saveDataRole()"
        >保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { isEmpty, showNotification, error } from "../../utils/index.js";

import DialogBase from "../../components/DialogBase/index.vue";
import elDragDialog from "@/directive/el-drag-dialog";
import SysModule from "@/components/ComboBox/SysModule";
import CustomTree from "@/components/tree/src/tree.vue";

// import MutiWechatAccountTags from "@/components/ComboBox/MutiWechatAccountTags";
// import MutiWechatAccountGroup from "@/components/ComboBox/MutiWechatAccountGroup";
import Department from "@/components/ComboBox/Department";

import {
  deleterole,
  getrolelist,
  addrole,
  modifyrole,
  getrolebyuser,
  getpermissions,
  savepermission,
  getrolemodulepermission
} from "../../api/datarole.js";

import { alldata } from "@/api/sysmodule.js";
import { getEmployeeTree } from "@/api/combobox.js";

let selectRole = {};
let curPage = 1;

export default {
  name: "DataRole",
  components: {
    MutiWechatAccountGroup,
    MutiWechatAccountTags,
    Department,
    DialogBase,
    SysModule
  },
  data() {
    return {
      curModuleId: "",
      dataModules: [],
      isModified: false,
      treedatas: [],
      disabledKeys: [],
      treeloading: false,
      filterText: "",
      permissionList: {},
      permissionroutes: [],
      // checkStrictly: false,
      curRole: {},
      roleList: [],
      totalPage: 0,
      totalCount: 0,
      perPage: 20,
      isLoading: false,
      isShowModifyRoleDialog: false,
      isStaticRole: "false",
      isDefaultRole: "false",
      formLabelWidth: "80px",
      selectedLabelList: [],
      selectedGroupList: [],
      selectedDept: null,
      curWechatGroupList: [],
      curDepartmentList: [],
      curLabelList: [],
      dialogInfo: {},
      roleDialogVisible: false,
      saveloading: false,
      ruleForm: {},
      rules: {
        name: [
          {
            required: true,
            message: "角色名称",
            trigger: "blur"
          }
        ],
        displayName: [
          {
            required: true,
            message: "显示名称",
            trigger: "blur"
          }
        ],
        description: [
          {
            required: true,
            message: "角色描述",
            trigger: "blur"
          }
        ]
      },
      datapermissionRules: {
        sysmoduleId: [
          {
            required: true,
            message: "功能模块",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    moduleSelected: function() {
      return this.curModuleId && this.curModuleId != "";
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    curModuleId(val) {
      if (this.treeVisible) {
        this.treeVisible = val != "";
      }
    }
  },
  created() {
    this.getRoleList();
    this.setPermisson();
    this.initData();
  },
  methods: {
    //权限编辑 start
    handleAddDepartment() {
      var dept = this.selectedDept;
      if (!dept || dept == null) {
        showNotification(this, "请选择部门", "");
        return;
      }
      var putItems = [
        {
          ModuleId: this.curModuleId,
          MapType: 2,
          DataRoleId: this.curRole.id,
          MapId: dept.id,
          type: 0, //表示未保存
          MapName: dept.fullName
        }
      ];
      if (this.curDepartmentList.length > 0) {
        let result = this.curDepartmentList.findIndex(
          ele => ele.MapId === dept.id || ele.mapId === dept.id
        );
        if (result < 0) {
          this.curDepartmentList = this.curDepartmentList.concat(putItems);
        }
      } else {
        this.curDepartmentList = this.curDepartmentList.concat(putItems);
      }

      this.selectedDept = null;
    },
    handleDeptDelete(item) {
      var index = this.curDepartmentList.indexOf(item);
      if (index >= 0) {
        this.curDepartmentList.splice(index, 1);
      }
    },
    handleGroupDelete(item) {
      var index = this.curWechatGroupList.indexOf(item);
      if (index >= 0) {
        this.curWechatGroupList.splice(index, 1);
      }
    },
    handleLabelDelete(item) {
      var index = this.curLabelList.indexOf(item);
      if (index >= 0) {
        this.curLabelList.splice(index, 1);
      }
    },
    deptChange(val) {
      this.selectedDept = val;
    },

    handleAddGroup() {
      var groupItems = [];
      this.selectedGroupList.forEach(item => {
        if (this.curWechatGroupList.length > 0) {
          let result = this.curWechatGroupList.findIndex(
            ele => ele.MapId === item.id || ele.mapId === item.id
          );
          if (result < 0) {
            groupItems.push({
              ModuleId: this.curModuleId,
              MapType: 1,
              DataRoleId: this.curRole.id,
              type: 0, //表示未保存
              MapId: item.id,
              MapName: item.displayName
            });
          }
        }else{
           groupItems.push({
              ModuleId: this.curModuleId,
              MapType: 1,
              DataRoleId: this.curRole.id,
              type: 0, //表示未保存
              MapId: item.id,
              MapName: item.displayName
            });
        }
      });

      this.curWechatGroupList = this.curWechatGroupList.concat(groupItems);
      this.selectedGroupList = [];
    },
    handleAddLabel() {
      var labelItems = [];
      this.selectedLabelList.forEach(item => {
        if (this.curLabelList.length > 0) {
          let result = this.curLabelList.findIndex(
            ele => ele.MapId === item.id || ele.mapId === item.id
          );
          if (result < 0) {
            labelItems.push({
              ModuleId: this.curModuleId,
              MapType: 3,
              DataRoleId: this.curRole.id,
              MapId: item.id,
              type: 0, //表示未保存
              MapName: item.name
            });
          }
        }else{
           labelItems.push({
              ModuleId: this.curModuleId,
              MapType: 3,
              DataRoleId: this.curRole.id,
              MapId: item.id,
              type: 0, //表示未保存
              MapName: item.name
            });
        }
      });
      this.curLabelList = this.curLabelList.concat(labelItems);
      this.selectedLabelList = [];
    },

    //保存用户组权限
    saveDataRole() {
      var roleid = this.curRole.id;
      if (!this.curModuleId || this.curModuleId == "") {
        error(this, "请选择功能模块");
        return;
      }
      var putItems = this.curDepartmentList;
      putItems = putItems
        .concat(this.curWechatGroupList)
        .concat(this.curLabelList);
      this.saveloading = true;

      var roleId = roleid;
      var moduleid = this.curModuleId;
      savepermission({ roleid: roleId, moduleId: moduleid }, putItems)
        .then(res => {
          showNotification(this, "保存成功", "");

          this.saveloading = false;

          //重新加载数据，刷新
          this.getmodulePermission(roleId, moduleid);
        })
        .catch(err => {
          error(this, "修改失败" + err);
          this.saveloading = false;
        });
    },
    //权限编辑 end

    initData() {
      alldata()
        .then(res => {
          this.dataModules = res.result;
        })
        .catch(err => {
          Console.log(err);
        });
    },
    // 获取用户组列表
    getRoleList() {
      this.isLoading = true;
      getrolelist({
        Page: curPage,
        PageSize: this.perPage
      })
        .then(res => {
          this.isLoading = false;
          this.roleList = res.result.data.items;
          this.totalPage = res.result.data.totalPage;
          this.totalCount = res.result.data.totalCount;
        })
        .catch(err => {
          this.isLoading = false;
        });
    },
    // 分页选择
    selectPage(val) {
      curPage = val;
      this.getRoleList();
    },
    // 新增/修改用户组
    modifyRoleInfo(index, roleInfo) {
      this.isShowModifyRoleDialog = true;
      if (!roleInfo) {
        this.ruleForm = {};
        this.isModified = false;
      } else if (!isEmpty(roleInfo)) {
        this.isDefaultRole = roleInfo.isDefault.toString();
        this.isStaticRole = roleInfo.isStatic.toString();
        this.ruleForm = roleInfo;
        this.isModified = true;
      }
    },
    // 确认新增/修改用户组
    configModifyRole(roleInfo, formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          roleInfo.isDefault = this.isDefaultRole;
          roleInfo.isStatic = this.isStaticRole;

          if (this.isModified) {
            modifyrole(roleInfo).then(res => {
              this.postSuccess(res.result.data);
            });
          } else {
            addrole(roleInfo).then(res => {
              if (res.success) {
                this.postSuccess(res.result.data);
                this.selectPage(1);
                this.isModified = false;
              } else {
                showNotification(this, res.result.data, "");
              }
            });
          }
        }
      });
    },
    postSuccess(title) {
      this.isShowModifyRoleDialog = false;
      this.$emit("isAddUserSuccess", true);
      showNotification(this, title, "");
    },
    // 删除用户组
    deleteRole(index, roleInfo) {
      selectRole = roleInfo;
      selectRole.index = index;

      this.dialogInfo = {
        title: "确认操作",
        content: "是否删除该用户组权限？"
      };
    },
    // 确认删除用户组
    confirmHandle() {
      deleterole([selectRole.id]).then(res => {
        this.roleList.splice(selectRole.index, 1);
      });
    },
    //设置用户组权限
    setPermission(row) {
      this.roleDialogVisible = true;
      this.filterText = "";
      this.curRole = row;
      if (this.curModuleId && this.curModuleId != "") {
        this.getmodulePermission(row.id, this.curModuleId);
      }
    },
    modulevaluechange(newValue) {
      this.curModuleId = newValue;
      if (this.curRole) {
        this.getmodulePermission(this.curRole.id, this.curModuleId);
      }
    },
    getmodulePermission(roleId, sysmoduleId) {
      var rId = roleId;
      var moduleid = sysmoduleId;
      this.treeloading = true;
      getrolemodulepermission(rId, moduleid).then(res => {
        var list = res.result;
        this.curWechatGroupList = [];
        this.curDepartmentList = [];
        this.curLabelList = [];
        list.forEach(item => {
          item.ModuleId = item.sysModuleId;
          item.MapName = item.name;
          if (item.mapType == 1) {
            //组
            this.curWechatGroupList.push(item);
          } else if (item.mapType == 2) {
            //部门
            this.curDepartmentList.push(item);
          } else if (item.mapType == 3) {
            //标签
            this.curLabelList.push(item);
          }
        });
      });
    },
    GetTagStyle(type) {
      switch (type) {
        case 0:
          return "danger";
        default:
          return "success";
      }
    },
    setPermisson() {
      var arr = this.$store.getters.permissions;
      if (!arr) return;
      this.permissionList.Users_Admin_Rose_Add = arr.includes(
        "Users_Admin_DataRole_Add"
      );
      this.permissionList.Users_Admin_Rose_Upd = arr.includes(
        "Users_Admin_DataRole_Upd"
      );
      this.permissionList.Users_Admin_Rose_Del = arr.includes(
        "Users_Admin_DataRole_Del"
      );
      this.permissionList.Users_Admin_Rose_SetPermission = arr.includes(
        "Users_Admin_DataRole_SetPermission"
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  padding: 10px;
  height: 100%;
}
.title {
  font-size: 18px;
  color: #606266;
  line-height: 1.5em;
}
.body {
  position: fixed;
  overflow-y: scroll;
  width: 100%;
  height: calc(100% - 200px);
}
.footer {
  margin-bottom: 10px;
  position: fixed;
  bottom: 0px;
}
.tagList {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
