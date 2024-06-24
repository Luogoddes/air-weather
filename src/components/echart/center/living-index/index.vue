<!--
 * @Author: 洛白BG 642160753@qq.com
 * @Date: 2024-06-07 15:03:03
 * @LastEditors: 洛白BG 642160753@qq.com
 * @LastEditTime: 2024-06-09 20:34:08
 * @Description: 
-->
<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import Chart from './chart.vue';
import { mapState } from 'vuex';
export default {
  components: {
    Chart,
  },
  computed: {
    ...mapState({
      livingIndex: state => state.livingIndex,
    }),
  },
  watch: {
    'livingIndex': function (newId) {
      if (newId) {
        //alert("livingIndex 监听到地区值改变:" + newId)
        this.cdata.livingIndexData=newId;
      }
    }
  },
  created() {
    if (this.livingIndex) {
      //alert("livingIndex 有")
      this.cdata.livingIndexData=this.livingIndex;
    } 
    // else {
    //   alert("livingIndex 没有")
    // }
  },
  data() {
    return {
      cdata: {
        indicatorData: [
          { name: "运动指数", max: 3 },
          { name: "穿衣指数", max: 7 },
          { name: "紫外线指数", max: 5 },
          { name: "舒适度指数", max: 7 },
          { name: "感冒指数", max: 4 },
          { name: "晾晒指数", max: 6 },
        ],
        livingIndexData: [3, 7, 5, 7, 4, 6],

      }
    }
  },
}
</script>