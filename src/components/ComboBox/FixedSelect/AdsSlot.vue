
<template>
  <el-select  class="width260"  :value="selectedValue" collapse-tags @change="changeValue" :size="size" :disabled="disabled" :placeholder="placeholder" :class="myclass" :clearable="clearable">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
const optionsList = [{
    value: 0,
    label: "全部"
},{
    value: 4090752905805508,
    label: "公众号-视频后贴广告位"
},{
    value: 72058780271891663,
    label: "公众号-文章底部广告位"
},{
    value: 9020229299926746,
    label: "公众号-文章中部广告位"
},{
    value: 20160808,
    label: "公众号-互选广告位"
}
// ,{
//     value: 8040321819858439,
//     label: "小程序-banner广告位"
// },{
//     value: 1030436212907001,
//     label: "小程序-激励视频"
// },{
//     value: 3030046789020061,
//     label: "小程序-插屏广告位"
// },{
//     value: 7070083760581921,
//     label: "小程序-格子广告位"
// },{
//     value: 7090665964306299,
//     label: "小程序-前贴视频广告位"
// },{
//     value: 5010365819466098,
//     label: "小程序-视频广告位"
// }
];
export default {
  optionsList: optionsList,
  name: "AdsSlot",
  model: {
    prop: "selectedValue",
    event: "change"
  },
  props: {
    selectedValue: { type: Number,default:0 },
    size: { type: String, default: "mini" },
    disabled: { type: Boolean, default: false },
    placeholder: { type: String, default: "广告Slot" },
    myclass: { type: String, default: "" },
    clearable: { type: Boolean, default: false },
  },
  data() {
    return {
        options: optionsList
    };
  },
  methods: {
    changeValue(val) {
      this.$emit("change", val);
    }
  }
};
</script>