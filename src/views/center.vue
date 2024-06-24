<template>
  <div id="center">
    <div class="up">
      <div class="bg-color-black item" v-for="item in titleItem" :key="item.title">
        <p class="ml-3 colorBlue fw-b">{{ item.title }}</p>
        <div class="ml-1 mt-2 pl-3" style="font-size: 26px;color: #67E0E3; font-weight: bold;">
          {{ item.number }}
          <!-- <dv-digital-flop
            class="dv-dig-flop ml-1 mt-2 pl-3"
            :config="item.number"
          /> -->
        </div>
      </div>
    </div>

    <div class="down">
      <div class="percent">
        <div class="item bg-color-black">
          <span>今日相对湿度</span>
          <CenterChart :id="rate[0].id" :tips="rate[0].tips" :colorObj="rate[0].colorData" />
        </div>
        <div class="item bg-color-black">
          <span>今日相对云量</span>
          <CenterChart :id="rate[1].id" :tips="rate[1].tips" :colorObj="rate[1].colorData" />
        </div>
        <div class="water" v-if="water.flag">
          <dv-water-level-pond class="dv-wa-le-po" :config="water" />
        </div>
      </div>
      <div class="ranking bg-color-black">
        <LivingIndex style="margin-top: -20px;margin-left: 22px;" />
      </div>

    </div>
  </div>
</template>

<script>
import LivingIndex from '@/components/echart/center/living-index'
import CenterChart from '@/components/echart/center/centerChartRate'
import axios from 'axios'
import { mapState } from 'vuex';
export default {
  components: {
    CenterChart, LivingIndex
  },
  computed: {
    ...mapState({
      region: state => state.region,
    }),
  },
  watch: {
    'region.id': function (newId) {
      if (newId) {
        //alert("center 监听到地区值改变，开始轮询数据:" + newId)
        this.drawTimingFn(newId);
      }
    }
  },
  mounted() {
    if (this.region.id) {
      //alert("center 有")
      this.drawTimingFn(this.region.id);
    } 
    // else {
    //   alert("center 没有")
    // }
  },
  data() {
    return {
      titleItem: [
        {
          title: '最新物理更新时间',
          number: '5-28 19:48'
        },

        {
          title: '今日天气状况',
          number: '多云'
        },
        {
          title: '今日风向--等级',
          number: '西北风 1级'
        },
        {
          title: '今日大气压强',
          number: '83%'
        },
        {
          title: '今日能见度',
          number: '8km'
        }, {
          title: '风级陆上情况',
          number: '静,烟直上'
        },
      ],

      water: {
        data: [0, 0],
        shape: 'roundRect',
        formatter: '降雨量{value}mm',
        waveNum: 3,
        flag: false,
      },
      weather: {
        temp: 0,   //温度
        feelsLike: 0,  //体感温度
        windSpeed: 0,  //风速
        humidity: 0,   //湿度
        vis: '',
        sunrise: '',
        sunset: '',
        icon: '',
      },
      // 通过率和达标率的组件复用数据
      rate: [
        {
          id: 'centerRate1',
          tips: 60,
          colorData: {
            textStyle: '#3fc0fb',
            series: {
              color: ['#00bcd44a', 'transparent'],
              dataColor: {
                normal: '#03a9f4',
                shadowColor: '#97e2f5'
              }
            }
          }
        },
        {
          id: 'centerRate2',
          tips: 40,
          colorData: {
            textStyle: '#67e0e3',
            series: {
              color: ['#faf3a378', 'transparent'],
              dataColor: {
                normal: '#ff9800',
                shadowColor: '#fcebad'
              }
            }
          }
        }
      ]
    }
  },
  methods: {
    drawTimingFn(location) {
      this.getWeatherInfo(location);
      this.drawTiming = setInterval(() => {
        this.getWeatherInfo(location);
      }, 600000);   //600000（10分钟的毫秒数）
    },
    getWeatherInfo(location) {
      const windConditions = {
        0: "静,烟直上",
        1: "烟示风向",
        2: "感觉有风",
        3: "旌旗展开",
        4: "吹起尘土",
        5: "小树摇摆",
        6: "电线有声",
        7: "步行困难",
        8: "折毁树枝",
        9: "小损房屋",
        10: "拔起树木",
        11: "损毁重大",
        12: "摧毁极大"
      };
      //const location = this.$store.getters.getRegionId;
      //alert("center的" + location)
      axios.get(`https://devapi.qweather.com/v7/weather/now?location=${location}&key=${this.$apiKey}`)
        .then(response => {

          console.log("=====center=====");
          console.log(response.data.now);

          this.weather = response.data.now;
          const data = response.data.now;
          this.$store.commit('setLocationWeather', this.weather);
          this.rate[0].tips = Number(data.humidity);
          this.rate[1].tips = Number(data.cloud);
          if (Number(data.precip) <= 15) {
            this.water.data = [0, Number(data.precip)];
            this.water.flag = true;
          } else {
            this.water.data = [Number(data.precip) - 10, Number(data.precip)];
            this.water.flag = true;
          }
          // 更新 titleItem 数组中的字段

          this.titleItem[0].number = data.obsTime.replace('T', ' ').substring(5, 16); // 截取 "2024-06-08T18:32+08:00" 中的日期和时间部分
          this.titleItem[1].number = data.text;
          this.titleItem[2].number = `${data.windDir} ${data.windScale}级`;
          this.titleItem[3].number = `${data.pressure} Pa`;
          this.titleItem[4].number = `${data.vis}km`;
          this.titleItem[5].number = windConditions[data.windScale];
        })
        .catch(error => {
          console.error('Error fetching weather info:', error);
        });
    },
  },
  beforeDestroy() {
    clearInterval(this.drawTiming);
  },

}
</script>

<style lang="scss" scoped>
#center {
  display: flex;
  flex-direction: column;

  .up {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .item {
      border-radius: 6px;
      padding-top: 8px;
      margin-top: 8px;
      width: 32%;
      height: 70px;

      .dv-dig-flop {
        width: 150px;
        height: 30px;
      }
    }
  }

  .down {
    padding: 6px 4px;
    padding-bottom: 0;
    width: 100%;
    display: flex;
    height: 255px;
    justify-content: space-between;

    .bg-color-black {
      border-radius: 5px;
    }

    .ranking {
      padding: 7px;
      width: 58%;

      .dv-scr-rank-board {
        height: 225px;
      }
    }

    .percent {
      width: 41%;
      display: flex;
      flex-wrap: wrap;

      .item {
        width: 50%;
        height: 120px;

        span {
          margin-top: 8px;
          font-size: 14px;
          display: flex;
          justify-content: center;
        }
      }

      .water {
        width: 100%;

        .dv-wa-le-po {
          height: 120px;
        }
      }
    }
  }
}
</style>
