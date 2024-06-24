<!--
 * @Author: 洛白BG 642160753@qq.com
 * @Date: 2024-05-20 11:04:24
 * @LastEditors: 洛白BG 642160753@qq.com
 * @LastEditTime: 2024-06-09 20:27:32
 * @Description: 
-->
<template>
  <div id="centerLeft1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-pie" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="text mx-2">温度风速</span>
          <dv-decoration-1 class="dv-dec-1" />
        </div>
      </div>
      <div class="d-flex jc-center">
        <temperature id="temp" :tips="this.weatherData" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import temperature from "@/components/echart/center/temperature.vue";
export default {
  components: {
    temperature
  },
  computed: {
    ...mapState({
      weather: state => state.weather,
    }),
  },
  watch: {
    'weather.temp': function (temp) {
      if (temp) {
        //alert("center 监听到地区值改变，开始轮询数据:" + newId)
        this.weatherData = this.weather;
      }
    }
  },
  mounted() {
    if (this.weather.temp) {
      //alert("center 有")
      this.weatherData = this.weather;
    }
    // else {
    //   alert("center 没有")
    // }
  },
  data() {
    return {
      weatherData: {
        // temp: 0,
        // feelsLike: 0, //体感温度
        // windSpeed: 0,// 风速
      },
    };
  },
};
</script>

<style lang="scss" scoped>
#centerLeft1 {
  $box-width: 300px;
  $box-height: 410px;
  padding: 16px;
  height: $box-height;
  min-width: $box-width;
  border-radius: 5px;

  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }

  .text {
    color: #c3cbde;
  }

  .dv-dec-1 {
    position: relative;
    width: 100px;
    height: 20px;
    top: -3px;
  }

  .chart-box {
    margin-top: 16px;
    width: 170px;
    height: 170px;

    .active-ring-name {
      padding-top: 10px;
    }
  }
}
</style>