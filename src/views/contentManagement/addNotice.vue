<!--
 * @Description: 系统公告->添加公告
 * @version: 
 * @Author: ximusunian
 * @Date: 2020-10-16 14:18:16
 * @LastEditors: ximusunian
 * @LastEditTime: 2020-10-16 14:51:11
-->
<template>
  <div id="addNotice">
    <el-container>
      <el-form ref="baseForm" :model="noticeForm" label-width="100px">
        <el-form-item label="公告内容" size="medium">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 10}"
            v-model="noticeForm.value"
            placeholder="公告内容长度请限制在500个汉字内"
            maxlength="500"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="立即显示" size="medium">
           <el-switch
            v-model="noticeForm.isShow"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="字段排序" size="medium">
          <el-input type="number" v-model="noticeForm.sort" placeholder="排序数字越大显示越靠前"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "addNotice",
  data() {
    return {
      noticeForm: {
        value: '',
        isShow: true,
        sort: '',
      },
    };
  },
  components: {},
  watch: {},
  mounted() {},
  methods: {
    onSubmit() {

    }
  },
};
</script>

<style scoped lang="scss">
#addNotice {
  padding: 2rem 0;
  .el-form {
    width: 80%;
  }
}
</style>
