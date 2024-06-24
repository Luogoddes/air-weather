<!--
 * @Author: 洛白BG 642160753@qq.com
 * @Date: 2024-05-20 11:04:24
 * @LastEditors: 洛白BG 642160753@qq.com
 * @LastEditTime: 2024-05-31 14:21:27
 * @Description: 
-->
<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import Chart from './chart.vue';
export default {
  data () {
    return {
      cdata: {
        indicatorData: [
          { name: "运动指数", max: 3 },
          { name: "穿衣指数", max: 7 },
          { name: "紫外线指数", max: 5 },
          { name: "舒适度指数", max: 7},
          { name: "感冒指数", max: 4 },
          { name: "晾晒指数", max: 6 },
        ],
        dataBJ: [  //一个数据加线的话在加data
          [1, 2, 2, 5, 4, 3, 2],
          // [1, 2, 2, 5, 4, 3, 2],
          // [1, 2, 2, 5, 4, 3, 2],
          // [1, 2, 2, 5, 4, 3, 2],
          // [1, 2, 2, 5, 4, 3, 2],
          // [1, 2, 2, 5, 4, 3, 2],
        ],
      }
    }
  },
  components: {
    Chart,
  }
}
</script>