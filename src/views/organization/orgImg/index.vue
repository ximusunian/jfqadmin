<template>
  <div class="app-container">
    <div v-loading="loading">
      <br />
      <span>主题颜色:</span>
      <select v-model="labelClassName" class="form-control">
        <option value="bg-white">
          白色
        </option>
        <option value="bg-green">
          绿色
        </option>
        <option value="bg-orange">
          橙色
        </option>
        <option value="bg-gold">
          金色
        </option>
        <option value="bg-gray">
          灰色
        </option>
        <option value="bg-lightpink">
          粉色
        </option>
        <option value="bg-chocolate">
          巧克力
        </option>
        <option value="bg-tomato">
          番茄
        </option>
      </select>
      <input v-model="horizontal" type="checkbox" />
      <span>是否垂直显示</span>
      <input v-model="collapsable" type="checkbox" />
      <span>是否可折叠</span>
      <input v-model="expandAll" type="checkbox" @change="expandChange" />
      <span>是否展开</span>
    </div>
    <br />
    <div class="text-center">
      <vue2-org-tree
        name="test"
        :data="data"
        :horizontal="horizontal"
        :collapsable="collapsable"
        :label-class-name="labelClassName"
        :render-content="renderContent"
        @on-expand="onExpand"
        @on-node-click="onNodeClick"
      />
    </div>
  </div>
</template>
<script>
import Vue2OrgTree from "vue2-org-tree";
import { getOrgImg } from "@/api/organization.js";

export default {
  name: "OrganizationOrgImg",
  components: { Vue2OrgTree: Vue2OrgTree },
  data() {
    return {
      horizontal: true,
      collapsable: true,
      expandAll: true,
      labelClassName: "bg-white",
      data: {},
      loading: false
    };
  },
  created() {
    this.getform();
    this.toggleExpand(this.data, true);
  },
  methods: {
    getform() {
      this.loading = true;
      getOrgImg().then(res => {
        if (res.success) {
          this.data = res.result;
          this.toggleExpand(this.data, this.expandAll);
          this.loading = false;
        } else {
          this.$message(res.error.message);
        }
      });
    },
    renderContent(h, data) {
      return data.label;
    },
    onExpand(data) {
      if ("expand" in data) {
        data.expand = !data.expand;
        if (!data.expand && data.children) {
          this.collapse(data.children);
        }
      } else {
        this.$set(data, "expand", true);
      }
    },
    onNodeClick(e, data) {
      this.toggleExpand(data, !data.expand);
    },
    collapse(list) {
      var _this = this;
      list.forEach(function(child) {
        if (child.expand) {
          child.expand = false;
        }
        child.children && _this.collapse(child.children);
      });
    },
    expandChange() {
      this.toggleExpand(this.data, this.expandAll);
    },
    toggleExpand(data, val) {
      var _this = this;
      if (Array.isArray(data)) {
        data.forEach(function(item) {
          _this.$set(item, "expand", val);
          if (item.children) {
            _this.toggleExpand(item.children, val);
          }
        });
      } else {
        this.$set(data, "expand", val);
        if (data.children) {
          _this.toggleExpand(data.children, val);
        }
      }
    }
  }
};
</script>
<style type="text/css">
.org-tree-node-label {
  white-space: nowrap;
}
.bg-green {
  background-color: rgb(33, 199, 124);
}
.bg-white {
  background-color: white;
}
.bg-orange {
  background-color: orange;
}
.bg-gold {
  background-color: gold;
}
.bg-gray {
  background-color: gray;
}
.bg-lightpink {
  background-color: lightpink;
}
.bg-chocolate {
  background-color: chocolate;
}
.bg-tomato {
  background-color: tomato;
}
</style>
