<!--
 * @Author: 洛白BG 642160753@qq.com
 * @Date: 2024-05-20 11:04:24
 * @LastEditors: 洛白BG 642160753@qq.com
 * @LastEditTime: 2024-06-13 10:37:38
 * @Description: 
-->
<template>
  <div>
    <Chart :cdata="nowData" />
  </div>
</template>

<script>
import Chart from './chart.vue'
import axios from 'axios'
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      region: state => state.region,
    }),
  },
  watch: {
    'region.id': function (newId) {
      if (newId) {
        //alert("temp7day 监听到地区值改变，开始轮询数据:" + newId)
        this.getWeatherInfo(newId);
      }
    }
  },
  mounted() {
    if (this.region.id) {
      //alert("temp7daty 有")
      this.getWeatherInfo(this.region.id);
    }
  },
  data() {
    return {
      nowData: {
        time: [],     //时间
        textDay: [],  //白天天气描述
        windDirDay_windScaleDay: [],  //风向风速
        tempMax: [],  //最高气温
        tempMin: [],  //最低气温
        precip: [],   //降雨量
        uvIndex: [],  //紫外线强度
      },
    };
  },
  components: {
    Chart,
  },
  methods: {
    getWeatherInfo(location) {
      //const location = this.$store.getters.getRegionId;
      //alert("temp7day-：" + location)
      axios.get(`https://devapi.qweather.com/v7/weather/7d?location=${location}&key=${this.$apiKey}`)
        .then(response => {
          const data = response.data.daily
          console.log("=====bottom-temp7day-=======");
          //console.log(data);
          // 遍历数据并将值存入对应的数组中
          data.forEach(item => {
            // 处理日期格式
            const date = item.fxDate.split('-').slice(1).map(s => String(Number(s))).join('.');//item.fxDate.split('-').slice(1).join('.'); // 将 "2024-06-10" 转换为 "06.10"

            // 存储数据到对应数组中
            this.nowData.time.push(date + "日");
            this.nowData.textDay.push(item.textDay);
            this.nowData.windDirDay_windScaleDay.push(`${item.windDirDay} ${item.windScaleDay}级`);
            this.nowData.tempMax.push(item.tempMax);
            this.nowData.tempMin.push(item.tempMin);
            this.nowData.precip.push(item.precip);
            this.nowData.uvIndex.push(item.uvIndex);
          });
          console.log(this.nowData)
        })
        .catch(error => {
          console.error('Error fetching bottom-temp7day info:', error);
          this.$message.error('Error fetching temp7day info');
          this.nowData.time = ["25日", "26日", "27日", "28日", "29日", "30日", "31日"];     //时间
          this.nowData.textDay = ["小雨", "小雨", "阴", "小雨", "多云", "小雨", "小雨"];  //白天天气描述
          this.nowData.windDirDay_windScaleDay = ["东北风 1级", "东北风 1级", "东北风 1级", "东北风 1级", "东北风 1级", "东北风 1级", "东北风 1级"]; //风向风速
          this.nowData.tempMax = ["16.3", "16.2", "17.6", "14.2", "17.6", "25.7", "14.3"];  //最高气温
          this.nowData.tempMin = ["13.4", "12.8", "13.5", "12.5", "12.4", "13.2", "13"];  //最低气温
          this.nowData.precip = ["3.3", "6.2", "7.6", "4.2", "7.6", "5.7", "4.3"];   //降雨量
          this.nowData.uvIndex = ["3", "6", "6", "2", "6", "7", "4"]; //紫外线强度
        });
    }
  },
};
</script>

<style lang="scss" scoped></style>