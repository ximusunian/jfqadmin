<template>
  <div class="dashboard-container">
   
    </div>
        
</template>

<script>
import VeLine from "v-charts/lib/line.common";
import VeBar from "v-charts/lib/bar.common";
import Period from "@/components/Period"; 
import moment from "moment";
import { parseTime, getDateStr, getCurMonthFirst, getCurMonthLast } from "@/utils";

export default {
  name: "Dashboard",
  components: {
    Period: Period,
    VeLine: VeLine,
    VeBar: VeBar
  },
  data() {
    return {
      permissionList: []
    };
  },
  created() {
    this.permissionList = this.$store.getters.permissions;
 
  }
};
</script>

<style scoped>
.chart {
  margin-left: 20px;
  margin-top: 10px;
}

.flex {
  display: flex;
  margin-left: 40px;
}

.flex2 {
  display: flex;
  justify-content: space-between;
}

.carmargin {
  margin: 20px 40px 10px 40px;
}

.car {
  width: 230px;
  height: 240px;
  text-align: center;
  font-size: 18px;
}

.txt {
  font-weight: bolder;
  font-size: 18px;
}
</style>
