// <template>
//   <div>
//     <el-row :gutter="24" class="mt20">
//       <el-col :span="12">
//         <div class="grid-content bg-purple">
//           <el-card class="box-card">
//             <div slot="header" class="clearfix">
//               <span style="font-weight:bold">分组名称</span>
//               <el-button
//                 type="primary"
//                 size="mini"
//                 style="float: right;"
//                 @click="showAddDialog()"
//               >新增</el-button>
//             </div>
//             <el-table
//               ref="singleTable"
//               :data="tableData"
//               v-loading='isLoading'
//               border
//               height="550px"
//               highlight-current-row
//               @current-change="handleCurrentChange"
//             >
//               <el-table-column prop="id" label="分组ID" align="center" width="80" />
//               <el-table-column prop="name" label="分组名称" align="center" />
//               <el-table-column prop="adminGroupUsers" label="组内成员数" align="center">
//                 <template slot-scope="{row}">
//                   <span>{{ row.adminGroupUsers.length }}</span>
//                 </template>
//               </el-table-column>
//               <el-table-column label="操作" align="center" fixed="right" width="180">
//                 <template slot-scope="scope">
//                   <el-button
//                     :disabled="!permissionList.includes('Users_Admin_Group_Upd')"
//                     size="mini"
//                     type="success"
//                     @click="showEditDialog(scope.row)"
//                   >编辑</el-button>
//                   <el-button
//                     :disabled="!permissionList.includes('Users_Admin_Group_Del')"
//                     size="mini"
//                     type="danger"
//                     @click="deleted(scope.row)"
//                   >删除</el-button>
//                 </template>
//               </el-table-column>
//             </el-table>
//           </el-card>
//         </div>
//       </el-col>
//       <el-col :span="12">
//         <div class="grid-content bg-purple">
//           <el-card class="box-card">
//             <div slot="header" class="clearfix">
//               <span style="font-weight:bold">{{ curRow.name }}成员</span>
//             </div>
//             <el-table :data="subTableData" border height="550px">
//               <el-table-column prop="id" label="编号" align="center" width="80" />
//               <el-table-column prop="groupId" label="分组ID" align="center" width="120" />
//               <el-table-column prop="userId" label="成员名称" align="center">
//                 <template slot-scope="{row}">
//                   <span>{{ row.userId | userNameFilter(userData) }}</span>
//                 </template>
//               </el-table-column>
//             </el-table>
//           </el-card>
//         </div>
//       </el-col>
//     </el-row>

//     <el-dialog
//       :title="textMap[dialogStatus]"
//       :visible.sync="dialogFormVisible"
//       width="500px"
//       :close-on-click-modal="false"
//     >
//       <el-form :model="formData" :rules="rules" ref="formData" style="margin-left:50px;">
//         <el-form-item label="分组名称" label-width="80px" prop="name">
//           <el-input
//             v-model="formData.name"
//             auto-complete="off"
//             placeholder="分组名称"
//             class="width320"
//           />
//         </el-form-item>
//         <el-form-item label="组内成员" label-width="80px" prop="userIdArr">
//           <el-select
//             v-model="curUserIdArr"
//             placeholder="组内成员"
//             multiple
//             collapse-tags
//             filterable
//             clearable
//             @remove-tag="removeTag"
//             class="width320"
//           >
//             <el-option
//               v-for="item in userData"
//               :key="item.id"
//               :label="item.userName"
//               :value="item.id"
//             />
//           </el-select>
//         </el-form-item>
//         <el-form-item>
//           <el-button size="mini" @click="dialogFormVisible = false">取消</el-button>
//           <el-button size="mini" type="primary" @click="configFormData(dialogStatus)">确定</el-button>
//         </el-form-item>
//       </el-form>
//     </el-dialog>
//   </div>
// </template>

// <script>
// import { formatTime, isEmpty } from "@/utils";
// import { agGetList, agAdd, agEdit, agDel } from "@/api/admingroup/admingroup";
// import { getselecteduser } from "@/api/user";

// export default {
//   components: {},
//   filters: {
//     dateFormat(date) {
//       return formatTime(new Date(date), "yyyy-MM-dd");
//     },
//     userNameFilter(userId, userData) {
//       if (isEmpty(userData)) return "";
//       var typeKeyValue = userData.reduce((acc, cur) => {
//         acc[cur.id] = cur.userName;
//         return acc;
//       }, {});
//       return typeKeyValue[userId];
//     }
//   },
//   data() {
//     return {
//       isLoading: false,
//       permissionList: {},
//       selectRowArr: [],
//       selectIdArr: [],
//       tableData: [],
//       subTableData: [],
//       userData: [],
//       formData: {},
//       dialogFormVisible: false,
//       dialogStatus: "",
//       textMap: {
//         update: "编辑",
//         create: "新增"
//       },
//       rules: {
//         name: [{ required: true, message: "请输入分组名称", trigger: "blur" }]
//       },

//       dialogSubFormVisible: false,
//       curGroupId: 0,
//       curRowId: 0,
//       curRow: "",
//       curUserIdArr: []
//     };
//   },
//   created() {
//     this.permissionList = this.$store.getters.permissions;
//     this.getUserList();
//     this.getList();
//   },
//   methods: {
//     // 获取列表
//     getList() {
//       this.isLoading = true;
//       agGetList().then(res => {
        
//         this.tableData = res.result;
//         if (this.tableData.length > 0) {
//           this.setCurrent(this.tableData[this.curRowId]);
//         } else {
//           this.subTableData = [];
//         }
//         this.isLoading = false;
//       });
//     },
//     // 获取用户列表
//     getUserList() {
//       getselecteduser().then(res => {
        
//         this.userData = res.result;
//       });
//     },
//     // 主类目选中
//     handleCurrentChange(val) {
//       this.curRow = val;
//       this.curGroupId = this.curRow.id;
//       this.subTableData = this.curRow.adminGroupUsers;
//       this.curRowId = this.tableData.indexOf(this.curRow);
//     },
//     setCurrent(row) {
//       this.$refs.singleTable.setCurrentRow(row);
//       this.curRow = row;
//     },
//     removeTag() {
//       this.curUserIdArr = [];
//     },
//     // 点击新增弹窗
//     showAddDialog() {
//       this.dialogStatus = "create";
//       this.formData = {
//         adminGroupUsers: [],
//         groupId: this.curGroupId
//       };
//       this.dialogFormVisible = true;

//       this.$nextTick(() => {
//         this.$refs["formData"].clearValidate();
//       });
//     },
//     // 点击编辑弹窗
//     showEditDialog(row, type) {
      
//       this.formData = JSON.parse(JSON.stringify(row));
//       this.formData.groupId = this.curGroupId;
//       this.curUserIdArr = [];

//       if (
//         !isEmpty(this.formData.adminGroupUsers) &&
//         this.formData.adminGroupUsers.length > 0
//       ) {
//         this.formData.adminGroupUsers.forEach(item => {
//           this.curUserIdArr.push(item.userId);
//         });
//       }

//       this.dialogStatus = "update";
//       this.dialogFormVisible = true;

//       this.$nextTick(() => {
//         this.$refs["formData"].clearValidate();
//       });
//     },
//     // 提交新增、编辑
//     configFormData(val) {
//       this.$refs["formData"].validate(valid => {
//         if (valid) {
//           let adminGroupUsers = [];
//           if (!isEmpty(this.curUserIdArr) && this.curUserIdArr.length > 0) {
//             this.curUserIdArr.forEach(item => {
//               var result = this.formData.adminGroupUsers.filter(
//                 o => o.userId == item
//               );
//               if (isEmpty(result) || result.length == 0) {
//                 adminGroupUsers.push({ userId: item });
//               } else {
//                 adminGroupUsers.push(result[0]);
//               }
//             });
//           }
//           this.formData.adminGroupUsers = adminGroupUsers; 

//           if (val == "create") {
//             agAdd(this.formData).then(res => {
              
//               if (res.success) {
//                 if (res.result.success) {
//                   this.$message.success("新增成功");
//                 } else {
//                   this.$notify.error({
//                     title: "提示",
//                     message: res.result.message,
//                     duration: 0
//                   });
//                 }
//                 this.getList();
//                 this.dialogFormVisible = false;
//               } else {
//                 this.$message.error("新增失败");
//               }
//             });
//           } else {
            
//             agEdit(this.formData).then(res => { 
//               if (res.success) {
//                 if (res.success) {
//                   this.$message.success("编辑成功");
//                 } else {
//                   this.$notify.error({
//                     title: "提示",
//                     message: res.result.message,
//                     duration: 0
//                   });
//                 }
//                 this.getList();
//                 this.dialogFormVisible = false;
//               } else {
//                 this.$message.error("编辑失败");
//               }
//             });
//           }
//         } else {
//           // 校验
//           if (isEmpty(this.formData.name)) {
//             this.$message.error("请输入分组名称");
//             return;
//           }
//         }
//       });
//     },
//     // 全选
//     handleSelectionChange(val) {
//       this.selectionChange = val;
//       if (val.length < 1) {
//         this.$refs.multipleTable.clearSelection();
//         this.selectIdArr = [];
//         this.selectRowArr = [];
//       } else {
//         for (let i = 0; i < val.length; i++) {
//           this.selectIdArr[i] = val[i].id;
//           this.selectRowArr.push(val);
//         }
//       }
//     },
//     deleted(row) {
//       this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
//         confirmButtonText: "确定",
//         cancelButtonText: "取消",
//         type: "warning"
//       })
//         .then(() => {
//           let selectIdArr = [];
//           selectIdArr[0] = row.id; 
//           agDel(selectIdArr).then(res => {
            
//             if (res.result.success) {
//               this.$message.success("删除成功");
//               this.curRowId = 0;
//               this.getList();
//             } else {
//               this.$message.error("删除失败");
//             }
//           });
//         })
//         .catch((err) => {
          
//           this.$message({
//             type: "info",
//             message: "已取消删除"
//           });
//         });
//     }
//   }
// };
// </script>

// <style>
// .el-main {
//   background-color: rgb(255, 255, 255);
//   line-height: 40px !important;
// }

// .el-dialog {
//   width: 30%;
// }

// .grid-content-150 {
//   border-radius: 0.4em;
//   min-height: 9em;
// }
// </style>
