<template>
  <div>
    <el-dialog :title="dialogData.title" :visible.sync="dialogVisible" width="30%">
      <span class="fs18">{{ dialogData.content }}</span>
      <span slot="footer" class="text-center">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogInfo:{}
  },
  data() {
    return {
      dialogVisible: false,
      dialogData: {}
    }
  },
  watch: {
    dialogInfo: {
      handler(newValue, oldValue) {
        this.dialogData = newValue
        this.dialogVisible = true
      },
      immediate: false
    }
  },
  methods: {
    confirmHandle() {
      this.dialogVisible = false 
      this.$emit('confirmHandle', true)
    }
  }
}

</script>
