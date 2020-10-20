<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="系统公告">
        <anno />
      </el-tab-pane>
      <el-tab-pane label="个人消息">
        <message />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import anno from "@/views/message/anno.vue";
import message from "@/views/message/message.vue";

export default {
  components: { anno, message },
  data() {
    return {};
  },
  methods: {}
};
</script>
