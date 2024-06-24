<!--
 * @Author: 洛白BG 642160753@qq.com
 * @Date: 2024-05-20 11:04:24
 * @LastEditors: 洛白BG 642160753@qq.com
 * @LastEditTime: 2024-06-07 20:39:20
 * @Description: 
-->
<template>
  <div id="centerRight1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-bar" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="text mx-2">空气污染元素组成</span>
          <dv-decoration-3 class="dv-dec-3" />
        </div>
      </div>
      <div class="d-flex jc-center body-box">
        <PollutingElements />
      </div>
    </div>
  </div>
</template>

<script>
import PollutingElements from '@/components/echart/center/polluting-elements'
export default {
  components: {
    PollutingElements
  },
  data() {
    return {
      
    }
  }
}
</script>

<style lang="scss" scoped>
$box-height: 410px;
$box-width: 300px;
#centerRight1 {
  padding: 16px;
  padding-top: 20px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }
  .dv-dec-3 {
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
    .dv-scr-board {
      width: 270px;
      height: 340px;
    }
  }
}
</style>
