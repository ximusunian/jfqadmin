<template>
  <div>
    <el-select
      v-model="typeVal"
      placeholder="周期"
      class="width70"
      :clearable="clearable"
      @change="typeChange"
    >
      <el-option
        v-for="item in periodTypes"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-date-picker
      v-show="typeVal === 1"
      v-model="year"
      type="year"
      :clearable="clearable"
      placeholder="选择年"
      @change="yearChange"
      @blur="myblur"
    />
    <HalfYear
      v-show="typeVal === 7"
      :default-value="periodVal[0]"
      :get-value="getHalfYearValue"
      :change="halfYearChange"
      :blur="myblur"
      :clearable="clearable"
    />
    <quarter
      v-show="typeVal === 2"
      :default-value="periodVal[0]"
      :get-value="getValue"
      :change="quarterChange"
      :blur="myblur"
      :clearable="clearable"
    />
    <el-date-picker
      v-show="typeVal === 3"
      v-model="month"
      type="month"
      :clearable="clearable"
      placeholder="选择月"
      @change="monthChange"
      @blur="myblur"
    />
    <HalfMonth
      v-show="typeVal === 6"
      :default-value="periodVal[0]"
      :get-value="getHalfMonthValue"
      :change="halfMonthChange"
      :blur="myblur"
      :clearable="clearable"
    />
    <el-date-picker
      v-show="typeVal === 4"
      v-model="week"
      type="week"
      format="yyyy 第 WW 周"
      :clearable="clearable"
      placeholder="选择周"
      @change="weekChange"
      @blur="myblur"
    />
    <el-date-picker
      v-show="typeVal === 5"
      v-model="daterange"
      style="width: 220px;"
      :clearable="clearable"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="dateChange"
      @blur="myblur"
    />
  </div>
</template>

<script>
import Quarter from "@/components/Period/Quarter.vue";
import HalfMonth from "@/components/Period/HalfMonth.vue";
import HalfYear from "@/components/Period/HalfYear.vue";

export default {
  name: "Period",
  components: { 
    quarter: Quarter,
    HalfMonth,
    HalfYear,
  },
  props: {
    type: {
      type: Number,
      default: 3
    },
    period: {
      type: Array,
      default: () => []
    },
    clearable: {
      type: Boolean,
      default: true
    },
    blur: {
      type: Function,
      default: undefined
    },
    change: {
      type: Function,
      default: undefined
    }
  },
  data() {
    return {
      periodTypes: [
        { value: 1, label: "年" },
        { value: 2, label: "季" },
        { value: 3, label: "月" },
        { value: 4, label: "周" },
        { value: 5, label: "日" },
        { value: 6, label: "半月" },
        { value: 7, label: "半年" }
      ],
      year: null,
      quarter: null,
      month: null,
      halfmonth: null,
      week: null,
      daterange: null,
      typeVal: null,
      periodVal: []
    };
  },
  watch: {
    type: {
      handler(val) {
        if (!val) val = null;
        this.typeVal = val;
      },
      immediate: true
    },
    typeVal(val) {
      if (!val) val = null;
      this.$emit("update:type", val);
    },
    period: {
      handler(val) {
        if (!val) val = [];
        if (val.length) {
          for (const key in val) {
            val[key] = this.$moment(val[key]).format("YYYY-MM-DD");
          }
        }
        if (JSON.stringify(val) !== JSON.stringify(this.periodVal)) {
          this.periodVal = val;
          this.init();
        }
      },
      immediate: true
    },
    periodVal(val) {
      if (!val) val = []; 
      this.$emit("update:period", val);
      if (this.change) {
        this.change();
      }
    }
  },
  created() {},
  methods: {
    init() {
      if (this.periodVal && this.periodVal.length) {
        var sdate = this.periodVal[0];
        this.year = new Date(sdate);
        this.halfyear = JSON.parse(JSON.stringify(this.periodVal));
        this.quarter = JSON.parse(JSON.stringify(this.periodVal));
        this.month = new Date(sdate);
        this.halfmonth = JSON.parse(JSON.stringify(this.periodVal));
        this.week = new Date(sdate);
        // this.daterange = this.periodVal;
        this.daterange = JSON.parse(JSON.stringify(this.periodVal));
        this.typeChange(this.typeVal);
      }
    },
    getValue(val) {
      this.quarter = val;
      this.quarterChange();
    },
    getHalfMonthValue(val) {
      this.halfmonth = val;
      this.halfMonthChange();
    },
    getHalfYearValue(val) {
      this.halfyear = val;
      this.halfYearChange();
    },
    typeChange(val) {
      switch (val) {
        case 1:
          // 年
          this.yearChange();
          break;
        case 2:
          // 季
          this.quarterChange();
          break;
        case 3:
          // 月
          this.monthChange();
          break;
        case 4:
          // 周
          this.weekChange();
          break;
        case 5:
          // 日
          this.dateChange();
          break;
        case 6:
          // 半月
          this.halfMonthChange();
          break;
        case 7:
          // 半年
          this.halfYearChange();
          break;
        default:
          this.periodVal = [];
          break;
      }
    },
    yearChange() {
      var date = this.year;
      if (date instanceof Date && !isNaN(date.getTime())) {
        var year = this.$moment(date).format("YYYY");
        this.periodVal = [`${year}-01-01`, `${year}-12-31`];
      } else {
        this.periodVal = [];
      }
    },
    halfYearChange() {
      this.periodVal = this.halfyear;
    },
    quarterChange() {
      this.periodVal = this.quarter;
    },
    halfMonthChange() {
      this.periodVal = this.halfmonth;
    },
    monthChange() {
      var date = this.month;
      if (date instanceof Date && !isNaN(date.getTime())) {
        var edate = this.$moment(
          this.$moment()
            .month(this.$moment(date).month())
            .endOf("month")
            .valueOf()
        ).format("YYYY-MM-DD");
        this.periodVal = [this.$moment(date).format("YYYY-MM-DD"), edate];
      } else {
        this.periodVal = [];
      }
    },
    weekChange() {
      var date = this.week;
      if (date instanceof Date && !isNaN(date.getTime())) {
        var sdate = this.$moment(
          this.$moment()
            .week(this.$moment(date).week())
            .startOf("week")
            .valueOf()
        ).format("YYYY-MM-DD");
        var edate = this.$moment(
          this.$moment()
            .week(this.$moment(date).week())
            .endOf("week")
            .valueOf()
        ).format("YYYY-MM-DD");
        this.periodVal = [sdate, edate];
      } else {
        this.periodVal = [];
      }
    },
    dateChange() {
      if (this.daterange) {
        this.periodVal = [
          this.$moment(this.daterange[0]).format("YYYY-MM-DD"),
          this.$moment(this.daterange[1]).format("YYYY-MM-DD")
        ];
      } else {
        this.periodVal = [];
      }
    },
    valChange() {
      if (this.change) {
        this.change(this.typeVal, this.periodVal);
      }
    },
    myblur() {
      if (this.blur) {
        this.blur(this.typeVal, this.periodVal);
      }
    }
  }
};
</script>

<style scoped>
</style>