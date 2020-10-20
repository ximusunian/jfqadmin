<!--
 * @Description: 余额明细 -> 账户充值
 * @version: 
 * @Author: ximusunian
 * @Date: 2020-10-19 14:15:36
 * @LastEditors: ximusunian
 * @LastEditTime: 2020-10-19 15:19:27
-->
<template>
  <div id="recharge">
    <div class="mb-1 pt-1 el-row">
      <div class="el-col el-col-8" style="display: flex; align-items: center">
        <span>搜索类型：</span>
        <el-select v-model="value" placeholder="请选择" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="el-col el-col-7" style="display: flex; align-items: center">
        <span style="min-width: 6rem">搜索关键词：</span>
        <el-input
          v-model="searchValue"
          size="small"
          placeholder="请填写要搜索的关键词"
        ></el-input>
      </div>
      <el-button
        type="primary"
        icon="el-icon-search"
        size="small"
        style="margin-left: 2rem"
        >快速查找</el-button
      >
    </div>

    <div class="container-box">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @select="select"
        @select-all="selectAll"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column label="用户编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="登录账号" align="center">
          <template slot-scope="scope">{{ scope.row.account }}</template>
        </el-table-column>
        <el-table-column label="用户昵称" align="center">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">{{ scope.row.state }}</template>
        </el-table-column>
      </el-table>
      <div class="pagination-box">
        <el-button
          size="mini"
          type="primary"
          @click="addUser"
          style="margin-right: 2rem"
          >加入选中用户</el-button
        >
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </div>
    </div>

    <el-drawer
      title="充值"
      size="46%"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <div class="form-box">
        <div class="box">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="充值用户" size="medium">{{ form.username }}</el-form-item>
            <el-form-item label="余额类型" size="medium">
              <el-select v-model="form.balanceType" placeholder="请选择">
                <el-option
                  v-for="item in balanceTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="充值类型" size="medium">
              <el-select v-model="form.rewardType" placeholder="请选择">
                <el-option
                  v-for="item in rewardTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="充值金额" size="medium">
              <div style="display: flex">
                <el-input
                  v-model="form.rewardNumber"
                  placeholder="请填写充值金额"
                  type="number"
                ></el-input>
                <span style="margin-left: 0.3rem; min-width: 5rem"
                  >（单位元）</span
                >
              </div>
            </el-form-item>
            <el-form-item label="备注信息" size="medium">
              <el-input
                v-model="form.notes"
                type="textarea"
                maxlength="100"
                placeholder="填写备注说明充值原因,限100个汉字"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit">确认</el-button>
              <el-button @click="closeDrawer">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="warning-box">
        <i class="el-alert__icon el-icon-warning"></i>
        <div class="warning-txt">
          <p>功能说明∶</p>
          <p>当前模块直接增加用户账户金额金币余额。</p>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "recharge",
  data() {
    return {
      value: "",
      options: [
        {
          value: "id",
          label: "搜用户id",
        },
        {
          value: "username",
          label: "搜用户昵称",
        },
      ],
      searchValue: "",
      tableData: [
        {
          id: "100153",
          account: "DM20092516397873",
          username: "溪木素年",
          state: "是",
        },
      ],
      currentPage: 1,

      selectList: [],
      drawer: false,
      direction: "rtl",

      balanceTypeOptions: [
        {
          value: "accountNum",
          label: "账户余额",
        },
        {
          value: "goldNum",
          label: "金币余额",
        },
      ],
      rewardTypeOptions: [
        {
          value: "add",
          label: "增加",
        },
        {
          value: "deduct",
          label: "扣除",
        },
      ],
      form: {
        username: "100153",
        balanceType: "accountNum",
        rewardType: "add",
        rewardNumber: "",
        notes: "",
      },
    };
  },
  components: {},
  watch: {},
  mounted() {},
  methods: {
    handleSelectionChange() {},
    select() {},
    selectAll() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    addUser() {
      this.drawer = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    closeDrawer() {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.drawer = false
        })
        .catch((_) => {});
    },
    onSubmit() {
      
    }
  },
};
</script>

<style scoped lang="scss">
#recharge {
  .container-box {
    margin-top: 2rem;
    .pagination-box {
      margin-top: 1rem;
      display: flex;
    }
  }
  .form-box {
    padding: 1rem;
    background: #fff;
    .box {
      padding: 1rem;
      border: 1px solid #dcdfe6;
      -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
        0 0 6px 0 rgba(0, 0, 0, 0.04);
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    }
  }
  .warning-box {
    margin-top: 1rem;
    background-color: #fdf6ec;
    color: #e6a23c;
    width: 100%;
    padding: 8px 16px;
    box-sizing: border-box;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    opacity: 1;
    display: flex;
    align-items: center;
    .warning-txt {
      display: table-cell;
      padding: 0 8px;
      p {
        margin: 0.3rem;
        padding: 0;
      }
    }
  }
}
</style>
