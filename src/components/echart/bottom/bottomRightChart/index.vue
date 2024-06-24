<!--
 * @Author: 洛白BG 642160753@qq.com
 * @Date: 2024-05-20 11:04:24
 * @LastEditors: 洛白BG 642160753@qq.com
 * @LastEditTime: 2024-06-09 21:08:37
 * @Description: 
-->
<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import axios from 'axios'
import Chart from './chart.vue'
import { mapState } from 'vuex';
export default {
  data() {
    return {
      drawTiming: null,
      cdata: {
        summary: "概要",
        time: [],
        rain: [],
        snow: [],
      }
    }
  },
  components: {
    Chart,
  },
  computed: {
    ...mapState({
      region: state => state.region,
    }),
    // dataLoaded() {
    //   return this.data1 && this.data2 && this.data3 && this.data4 && this.data5 && this.data6 && this.additionalData;
    // }
  },
  watch: {
    'region.JWD': function (newId) {
      if (newId) {
        //alert("监听到地区值改变，开始轮询数据")
        this.drawTimingFn(newId);
      }
    }
  },
  mounted() {
    if (this.region.JWD) {
      //alert("bottomRightChart有")
      this.drawTimingFn(this.region.JWD);
    }
  },
  beforeDestroy() {
    clearInterval(this.drawTiming);
  },
  methods: {
    drawTimingFn(location) {
      this.getRainInfo(location);
      this.drawTiming = setInterval(() => {
        this.getRainInfo(location);
        //this.setData();
      }, 600000);   //600000（10分钟的毫秒数）
    },
    setData() {
      // 清空轮询数据
      // this.cdata.time = ['08:00', '08:10', '08:20', '08:30', '08:40', '08:50', '09:00', '09:10', '09:20', '09:30', '09:40', '09:50'];
      // this.cdata.rain = [2.0, 4.9, 7.0, 3.2, 5.6, 6.7, 5.6, 6.2, 3.6, 2.0, 6.4, 3.3];
      // this.cdata.snow = [2.6, 5.9, 9.0, 6.4, 8.7, 6.7, 5.6, 8.2, 8.7, 8.8, 6.0, 2.3];
      // 清空轮询数据
      this.cdata.time = [];
      this.cdata.rain = [];
      this.cdata.snow = [];
      let currentTime = new Date();
      // 生成随机数据
      for (let i = 0; i < 12; i++) {
        // 增加10分钟
        currentTime.setMinutes(currentTime.getMinutes() + 10);

        // 获取增加后的时间
        let hour = currentTime.getHours();
        let minute = currentTime.getMinutes();
        let time = `${hour}:${minute < 10 ? '0' + minute : minute}`;
        this.cdata.time.push(time);

        // 生成降雨量数据
        let rain = (Math.random() * 15).toFixed(2);
        this.cdata.rain.push(rain);

        // 生成降雪量数据
        let snow = (Math.random() * 15).toFixed(2);
        this.cdata.snow.push(snow);
      }

    },
    getRainInfo(location) {
      //alert("降雨量：" + location)
      axios.get(`https://devapi.qweather.com/v7/minutely/5m?location=${location}&key=${this.$apiKey}`)
        .then(response => {
          const data = response.data;
          console.log("=======降雨量======");
          //console.log(data);
          this.cdata.summary = data.summary;
          // 遍历数据并进行分类
          data.minutely.forEach(item => {
            const time = item.fxTime.substring(11, 16); // 提取时间的小时和分钟部分
            const precip = parseFloat(item.precip); // 转换降水数据为浮点数

            if (item.type === 'rain') {
              if (this.cdata.rain.length === 0 || this.cdata.rain[this.cdata.rain.length - 1].time !== time) {
                this.cdata.time.push(time);
                this.cdata.rain.push({ time, value: precip });
              } else {
                this.cdata.rain[this.cdata.rain.length - 1].value += precip;
              }
            } else if (item.type === 'snow') {
              if (this.cdata.snow.length === 0 || this.cdata.snow[this.cdata.snow.length - 1].time !== time) {
                this.cdata.time.push(time);
                this.cdata.snow.push({ time, value: precip });
              } else {
                this.cdata.snow[this.cdata.snow.length - 1].value += precip;
              }
            }
          });
          //console.log(this.cdata)
        })
        .catch(error => {
          console.error('Error fetching Warning info:', error);
        });
    },
  }
};
</script>

<style lang="scss" scoped></style>