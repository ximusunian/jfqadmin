<template>
  <div class="app-container">

    <el-button :disabled="!permissionList.Users_Admin_Rose_Add" size="mini" type="primary" @click="modifyRoleInfo">新增</el-button>
    <el-button size="mini" type="success" @click="selectPage(1)">刷新</el-button>

    <el-table v-loading="isLoading" class="mt10 mb10 border1-e1e1e1" border :data="roleList" style="text-align: left;">
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
          <el-button :disabled="!permissionList.Users_Admin_Rose_SetPermission" size="mini" type="primary" @click="setPermission(scope.row)">功能授权</el-button>
          <el-button :disabled="!permissionList.Users_Admin_Rose_Upd" size="mini" type="success" @click="modifyRoleInfo(scope.$index, scope.row)">编辑角色</el-button>
          <el-button :disabled="!permissionList.Users_Admin_Rose_Del" size="mini" type="danger" @click="deleteRole(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination background layout="prev, pager, next" @current-change="selectPage" :page-size="perPage" :total="totalCount">
    </el-pagination>

    <el-dialog :title="(isModified?'编辑':'新增')+'用户组权限'" :visible.sync="isShowModifyRoleDialog">
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
        <el-button class="ml40 width120" type="primary" @click="configModifyRole(ruleForm,'ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <DialogBase :dialogInfo="dialogInfo" @confirmHandle="confirmHandle" />
    <!-- <el-dialog @dragDialog="handleDrag" v-el-drag-dialog :visible.sync="roleDialogVisible" :title="'编辑权限:'+curRole.displayName"> -->
      <el-dialog :visible.sync="roleDialogVisible" :title="'编辑权限:'+curRole.displayName" fullscreen	>
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" />
      <el-form :model="curRole" label-width="80px" label-position="left">

        <el-form-item label="权限">
          <el-tree ref="tree"  :check-strictly="true" :data="permissionroutes" :props="defaultProps" v-loading="treeloading"
            :default-expanded-keys="defaultExpandedKeys" check-on-click-node @node-click="nodeClick"
            :default-checked-keys="defaultSelectedkeys" show-checkbox :filter-node-method="filterNode" node-key="id"
            :expand-on-click-node="false"  />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="roleDialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmRole(curRole.id)">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    isEmpty,
    showNotification
  } from '../../utils/index.js'

  import DialogBase from '../../components/DialogBase/index.vue'
  import elDragDialog from '@/directive/el-drag-dialog'

  import {
    deleterole,
    getrolelist,
    addrole,
    modifyrole,
    getrolebyuser,
    getpermissions,
    savepermission
  } from '../../api/role.js'

  let selectRole = {};
  let curPage = 1; 

  export default {
    directives:{elDragDialog},
    data() {
      return {
        treeloading:false,
        isModified:false,
        filterText: '',
        permissionList: {},
        permissionroutes: [],
        checkStrictly: false,
        curRole: {},
        roleList: [],
        totalPage: 0,
        totalCount: 0,
        perPage: 20,
        isLoading: false,
        isShowModifyRoleDialog: false,
        isStaticRole: 'false',
        isDefaultRole: 'false',
        formLabelWidth: '80px',
        dialogInfo: {},
        roleDialogVisible: false,
        ruleForm: {},
        defaultProps: {
          children: 'children',
          label: 'text'
        },
        defaultSelectedkeys: [],
        defaultExpandedKeys: [],
        rules: {
          name: [{
            required: true,
            message: "角色名称",
            trigger: "blur"
          }],
          displayName: [{
            required: true,
            message: "显示名称",
            trigger: "blur"
          }],
          description: [{
            required: true,
            message: "角色描述",
            trigger: "blur"
          }],
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    components: {
      DialogBase
    },
    created() {
      this.getRoleList();
      this.setPermisson()
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.text.indexOf(value) !== -1;
      },
      // 获取用户组列表
      getRoleList() {
        this.isLoading = true;

        getrolelist({
          PageIndex: curPage,
          PageSize: this.perPage
        }).then((res) => {
          this.isLoading = false; 
          this.roleList = res.result.items;
          this.totalPage = res.result.totalPage;
          this.totalCount = res.result.totalCount;
        }).catch(err=>{
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
        if(!roleInfo){
          this.ruleForm = {};
          this.isModified = false;
        }
        else if (!isEmpty(roleInfo)) {
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
              modifyrole(roleInfo).then((res) => {
                this.postSuccess(res.result.result);
              });
            } else {
              addrole(roleInfo).then((res) => {

                if (res.success) {
                  this.postSuccess(res.result);
                  this.selectPage(1);
                  this.isModified = false;
                } else {
                  showNotification(this, res.result.result, '');
                }
              });
            }
          }
        })
      },
      postSuccess(title) {
        this.isShowModifyRoleDialog = false;
        this.$emit('isAddUserSuccess', true);
        showNotification(this, title, '');
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
        deleterole([selectRole.id]).then((res) => {
          this.roleList.splice(selectRole.index, 1);
        });

      },
      //设置用户组权限
      setPermission(row) {
        this.roleDialogVisible = true;
        this.filterText = "";
        this.curRole = row;
        this.checkStrictly = true;
        this.treeloading = true;
        getpermissions({
          target: 0,
          data: row.id
        }).then((res) => {

          this.permissionroutes = res.result;
          this.defaultSelectedkeys = [];
          this.getGrantedKeys(this.defaultSelectedkeys, res.result);
          this.defaultExpandedKeys = this.defaultSelectedkeys;

          this.checkStrictly = false;

          this.treeloading = false;
        }).catch(err=>{
          this.treeloading = false;
        });
      },
      //保存用户组权限
      confirmRole(roleid) {
        var selectedRes = this.$refs.tree.getCheckedNodes();
        var halfCheckedKeys = this.$refs.tree.getHalfCheckedNodes();
        selectedRes = selectedRes.concat(halfCheckedKeys);

        var ids = [];
        selectedRes.forEach((item) => {
          ids.push(item.id);
        });
        savepermission({
          target: 0,
          data: roleid
        }, ids).then((res => {
          showNotification(this, res.result.result, '');
          this.roleDialogVisible = false;
        }))
        // .catch((error => {
        //   showNotification(this, "修改失败" + error, '');
        // }));
      },
      
      setPermisson() {
        var arr = this.$store.getters.permissions
        this.permissionList.Users_Admin_Rose_Add = arr.includes('Users_Admin_Rose_Add')
        this.permissionList.Users_Admin_Rose_Upd = arr.includes('Users_Admin_Rose_Upd')
        this.permissionList.Users_Admin_Rose_Del = arr.includes('Users_Admin_Rose_Del')
        this.permissionList.Users_Admin_Rose_SetPermission = arr.includes('Users_Admin_Rose_SetPermission')
      },

      getGrantedKeys(inputKeys, nodekeys) {
        nodekeys.forEach((item) => {
          if (item.state.selected) {
            inputKeys.push(item.id);
            if (item.children && item.children.length > 0) {
              this.getGrantedKeys(inputKeys, item.children);
            }
          }
        });
      },
      handleDrag() {
      this.$refs.select.blur()
    },
      nodeClick(data, node) {

        this.childNodesChange(node);
        this.parentNodesChange(node);
      },
      childNodesChange(node) {
        let len = node.childNodes.length;
        for (let i = 0; i < len; i++) {
          node.childNodes[i].checked = false;
          this.childNodesChange(node.childNodes[i]);
        }
      },
      parentNodesChange(node) {
        if (node.parent) {
          for (let key in node) {
            if (key == "parent") {
              node[key].checked = true;
              this.parentNodesChange(node[key]);
            }
          }
        }
      }
    }
  }
</script>
<style>
    .el-tree-node__label{
        position: relative;
      }
      .el-tree-node__label:before{
        content:'';
        width:30px;
        height: 30px;
        display: block;
        position:absolute;
        top:0px;
        left:-24px;
        z-index:999;
      }
      .el-checkbox__inner{
        top:0;
      }
  </style>