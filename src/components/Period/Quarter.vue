<template>
  <div class="jidudatepicker">
    <mark
      v-show="showSeason"
      style="float:left;position:fixed;top:0;bottom:0;left:0;right:0;background:rgba(0,0,0,0);z-index:999;"
      @click.stop="showSeason = false"
    />
    <el-input
      v-model="showValue"
      placeholder="请选择季度"
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
      style="width:322px;padding: 0 3px 20px;margin-top:10px;position:absolute;z-index:999999"
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
        <el-link
          :type="this.season == 1 ? 'primary' : 'default'"
          class="width50p"
          :underline="false"
          @click="selectSeason(1)"
          >第一季度</el-link
        >
        <el-link
          :type="this.season == 2 ? 'primary' : 'default'"
          class="width50p"
          :underline="false"
          @click="selectSeason(2)"
          >第二季度</el-link
        >
      </div>
      <div class="dis-flex-between">
        <el-link
          :type="this.season == 3 ? 'primary' : 'default'"
          class="width50p"
          :underline="false"
          @click="selectSeason(3)"
          >第三季度</el-link
        >
        <el-link
          :type="this.season == 4 ? 'primary' : 'default'"
          class="width50p"
          :underline="false"
          @click="selectSeason(4)"
          >第四季度</el-link
        >
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Quarter",
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
          this.season = Math.floor(date.getMonth() / 3) + 1;
          this.showValue = `${this.year}年${this.season}季度`;
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
    selectSeason(season) {
      this.season = season;
      this.showValue = `${this.year}年${this.season}季度`;
      // 返回值
      var period = [];
      switch (this.season) {
        case 1:
          period = [`${this.year}-01-01`, `${this.year}-03-31`];
          break;
        case 2:
          period = [`${this.year}-04-01`, `${this.year}-06-30`];
          break;
        case 3:
          period = [`${this.year}-07-01`, `${this.year}-09-30`];
          break;
        case 4:
          period = [`${this.year}-10-01`, `${this.year}-12-31`];
          break;
        default:
          period = [];
          break;
      }
      this.getValue(period);
    },
    myfocus() {
      this.showSeason = true;
      console.log(this.showSeason);
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
