<template>
  <div class="jidudatepicker">
    <mark
      v-show="showSeason"
      style="float:left;position:fixed;top:0;bottom:0;left:0;right:0;background:rgba(0,0,0,0);z-index:999;"
      @click.stop="showSeason = false"
    />
    <el-input
      v-model="showValue"
      placeholder="请选择半月"
      style="width:220px;"
      :clearable="clearable"
      @focus="myfocus"
      @blur="myblur"
      @change="mychange"
    >
      <i slot="prefix" class="el-input__icon el-icon-date" />
    </el-input>
    <el-card
      v-show="showSeason"
      class="box-card"
      style="width:352px;padding: 0 3px 20px;margin-top:10px;position:absolute;z-index:999999"
    >
      <div slot="header" class="clearfix" style="text-align:center;padding:0">
        <button
          type="button"
          aria-label="前一年"
          class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left"
          @click="prev"
        />
        <span role="button" class="el-date-picker__header-label">
          {{ year }}年
        </span>
        <button
          type="button"
          aria-label="后一年"
          class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right"
          @click="next"
        />
      </div>
      <div class="dis-flex-between mb20">
        <span class="text-center width30p">
          <span :class="this.month == 1 ? 'fg-409EFF' : ''">1月</span>
          (
          <el-link
            :type="this.month == 1 && this.season == 1 ? 'primary' : 'default'"
            :underline="false"
            @click="selectSeason(1, 1)"
            >上</el-link
          >
          <el-link
            :type="this.month == 1 && this.season == 2 ? 'primary' : 'default'"
            :underline="false"
            @click="selectSeason(1, 2)"
            >下</el-link
          >
          )
        </span>
        <span class="text-center width30p">
          <span :class="this.month == 2 ? 'fg-409EFF' : ''">2月</span>
          (
          <el-link
            :type="this.month == 2 && this.season == 1 ? 'primary' : 'default'"
            :underline="false"
            @click="selectSeason(2, 1)"
            >上</el-link
          >
          <el-link
            :type="this.month == 2 && this.season == 2 ? 'primary' : 'default'"
            :underline="false"
            @click="selectSeason(2, 2)"
            >下</el-link
          >
          )
        </span>
        <span class="text-center width30p">
          <span :class="this.month == 3 ? 'fg-409EFF' : ''">3月</span>
          (
          <el-link
            :type="this.month == 3 && this.season == 1 ? 'primary' : 'default'"
            :underline="false"
            @click="selectSeason(3, 1)"
            >上</el-link
          >
          <el-link
            :type="this.month == 3 && this.season == 2 ? 'primary' : 'default'"
            :underline="false"
            @click="selectSeason(3, 2)"
            >下</el-link
          >
          )
        </span>
      </div>
      <div class="dis-flex-between mb20">
        <span class="text-center width30p">
          <span :class="this.month == 4 ? 'fg-409EFF' : ''">4月</span>
          (
          <el-link
            :type="this.month == 4 && this.season == 1 ? 'primary' : 'default'"
            :underline="false"
            @click="selectSeason(4, 1)"
            >上</el-link
          >
          <el-link
            :type="this.month == 4 && this.season == 2 ? 'primary' : 'default'"
            :underline="false"
            @click="selectSeason(4, 2)"
            >下</el-link
          >
          )
        </span>
        <span class="text-center width30p">
          <span :class="this.month == 5 ? 'fg-409EFF' : ''">5月</span>
          (
          <el-link
            :type="this.month == 5 && this.season == 1 ? 'primary' : 'default'"
            :underline="false"
            @click="selectSeason(5, 1)"
            >上</el-link
          >
          <el-link
            :type="this.month == 5 && this.season == 2 ? 'primary' : 'default'"
            :underline="false"
            @click="selectSeason(5, 2)"
            >下</el-link
          >
          )
        </span>
        <span class="text-center width30p">
          <span :class="this.month == 6 ? 'fg-409EFF' : ''">6月</span>
          (
          <el-link
            :type="this.month == 6 && this.season == 1 ? 'primary' : 'default'"
            :underline="false"
            @click="selectSeason(6, 1)"
            >上</el-link
          >
          <el-link
            :type="this.month == 6 && this.season == 2 ? 'primary' : 'default'"
            :underline="false"
            @click="selectSeason(6, 2)"
            >下</el-link
          >
          )
        </span>
      </div>
      <div class="dis-flex-between mb20">
        <span class="text-center width30p">
          <span :class="this.month == 7 ? 'fg-409EFF' : ''">7月</span>
          (
          <el-link
            :type="this.month == 7 && this.season == 1 ? 'primary' : 'default'"
            :underline="false"
            @click="selectSeason(7, 1)"
            >上</el-link
          >
          <el-link
            :type="this.month == 7 && this.season == 2 ? 'primary' : 'default'"
            :underline="false"
            @click="selectSeason(7, 2)"
            >下</el-link
          >
          )
        </span>
        <span class="text-center width30p">
          <span :class="this.month == 8 ? 'fg-409EFF' : ''">8月</span>
          (
          <el-link
            :type="this.month == 8 && this.season == 1 ? 'primary' : 'default'"
            :underline="false"
            @click="selectSeason(8, 1)"
            >上</el-link
          >
          <el-link
            :type="this.month == 8 && this.season == 2 ? 'primary' : 'default'"
            :underline="false"
            @click="selectSeason(8, 2)"
            >下</el-link
          >
          )
        </span>
        <span class="text-center width30p">
          <span :class="this.month == 9 ? 'fg-409EFF' : ''">9月</span>
          (
          <el-link
            :type="this.month == 9 && this.season == 1 ? 'primary' : 'default'"
            :underline="false"
            @click="selectSeason(9, 1)"
            >上</el-link
          >
          <el-link
            :type="this.month == 9 && this.season == 2 ? 'primary' : 'default'"
            :underline="false"
            @click="selectSeason(9, 2)"
            >下</el-link
          >
          )
        </span>
      </div>
      <div class="dis-flex-between">
        <span class="text-center width30p">
          <span :class="this.month == 10 ? 'fg-409EFF' : ''">10月</span>
          (
          <el-link
            :type="this.month == 10 && this.season == 1 ? 'primary' : 'default'"
            :underline="false"
            @click="selectSeason(10, 1)"
            >上</el-link
          >
          <el-link
            :type="this.month == 10 && this.season == 2 ? 'primary' : 'default'"
            :underline="false"
            @click="selectSeason(10, 2)"
            >下</el-link
          >
          )
        </span>
        <span class="text-center width30p">
          <span :class="this.month == 11 ? 'fg-409EFF' : ''">11月</span>
          (
          <el-link
            :type="this.month == 11 && this.season == 1 ? 'primary' : 'default'"
            :underline="false"
            @click="selectSeason(11, 1)"
            >上</el-link
          >
          <el-link
            :type="this.month == 11 && this.season == 2 ? 'primary' : 'default'"
            :underline="false"
            @click="selectSeason(11, 2)"
            >下</el-link
          >
          )
        </span>
        <span class="text-center width30p">
          <span :class="this.month == 12 ? 'fg-409EFF' : ''">12月</span>
          (
          <el-link
            :type="this.month == 12 && this.season == 1 ? 'primary' : 'default'"
            :underline="false"
            @click="selectSeason(12, 1)"
            >上</el-link
          >
          <el-link
            :type="this.month == 12 && this.season == 2 ? 'primary' : 'default'"
            :underline="false"
            @click="selectSeason(12, 2)"
            >下</el-link
          >
          )
        </span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "HalfMonth",
  props: {
    getValue: {
      default: () => {},
      type: Function
    },
    defaultValue: {
      default: "",
      type: String
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
      showSeason: false,
      year: new Date().getFullYear(),
      month: null,
      season: null,
      showValue: ""
    };
  },
  watch: {
    defaultValue: {
      handler(val) {
        var date = new Date(val);
        if (date instanceof Date && !isNaN(date.getTime())) {
          this.year = date.getFullYear();
          this.month = date.getMonth() + 1;
          this.season = Math.floor(date.getDate() / 15) + 1;
          if(this.season == 1) {
            this.showValue = `${this.year}年${this.month}月上`;
          } else {
            this.showValue = `${this.year}年${this.month}月下`;
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    prev() {
      this.year = this.year * 1 - 1;
    },
    next() {
      this.year = this.year * 1 + 1;
    },
    selectSeason(month, season) {
      this.season = season;
      this.month = month;
      if(this.season == 1) {
        this.showValue = `${this.year}年${this.month}月上`;
      } else {
        this.showValue = `${this.year}年${this.month}月下`;
      }
      // 返回值
      var period = [];
      let day = this.getMonthDays(this.year, this.month);
      let mon = this.month > 10 ? this.month : ('0' + this.month);
      switch (this.season) {
        case 1:
          period = [`${this.year}-${mon}-01`, `${this.year}-${mon}-15`];
          break;
        case 2:
          period = [`${this.year}-${mon}-16`, `${this.year}-${mon}-${day}`];
          break;
        default:
          period = [];
          break;
      }
      this.getValue(period);
      this.showSeason = false;
    },
    //根据两个月份同一天的差值获取,同样是传入需要获取的对应年份和月份
    getMonthDays(year, month){
      var stratDate = new Date(year, month - 1, 1),
         endData = new Date(year, month, 1);
      var days = (endData - stratDate) / (1000 * 60 * 60 * 24);
      return days;
    },
    myfocus() {
      this.showSeason = true;
    },
    myblur() {
      if (this.blur) {
        this.blur();
      }
    },
    mychange() {
      if (this.change) {
        this.change();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.jidudatepicker {
  display: inline;
  .firstBtn {
    height: 30px;
    line-height: 34px;
    width: 100%;
    text-align: center;
  }
  .text {
    text-align: center;
    margin: 15px 0 10px;
  }
  .item {
    text-align: center;
  }
}
.colorDis {
  color: #999 !important;
}

.jidudatepicker {
  .el-card__header {
    padding: 12px;
  }
}
</style>
