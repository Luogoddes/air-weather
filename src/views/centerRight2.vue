<!--
 * @Author: 洛白BG 642160753@qq.com
 * @Date: 2024-05-20 11:04:24
 * @LastEditors: 洛白BG 642160753@qq.com
 * @LastEditTime: 2024-06-07 20:41:03
 * @Description: 
-->
<template>
  <div id="centerRight2">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span class="text mx-2">空气质量5日预报</span>
        <dv-decoration-1 class="dv-dec-1" />
      </div>
      <div class="d-flex ai-center">
        <AirQualityForecast />
      </div>
    </div>
  </div>
</template>

<script>
import AirQualityForecast from '@/components/echart/center/air-quality-forecast'

export default {
  data() {
    return {
    }
  },
  components: { AirQualityForecast }
}
</script>

<style lang="scss" scoped>
#centerRight2 {
  $box-height: 410px;
  $box-width: 340px;
  padding: 5px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    padding: 5px;
    height: $box-height;
    width: $box-width;
    border-radius: 10px;
  }
  .dv-dec-1 {
    position: relative;
    width: 100px;
    height: 20px;
    top: -3px;
  }
  .text {
    color: #c3cbde;
  }
  .body-box {
    border-radius: 10px;
    overflow: hidden;
    .dv-cap-chart {
      width: 100%;
      height: 180px;
    }
  }
}
</style>
