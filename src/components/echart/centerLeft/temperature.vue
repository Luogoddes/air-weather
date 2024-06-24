<template>
  <div>
    <!-- 通过率/达标率 -->
    <Echart :options="options" :id="id" height="310px" width="310px"></Echart>
  </div>
</template>

<script>
import Echart from '@/common/echart'
export default {
  data() {
    return {
      options: {
      },
    };
  },
  components: {
    Echart,
  },
  props: {
    id: {
      type: String,
      required: true,
      default: "temp"
    },
    tips: {
      type: Number,
      required: true,
      default: 50
    },
  },
  watch: {
    // tips 是会变更的数据，所以进行监听
    tips: {
      handler(newData) {
        const gaugeData = [
          {
            value: newData,
            name: '温度°C',
            title: {
              offsetCenter: ['-40%', '95%'] ,  //标题左右（近0向右）、上下（越大越下）
              color: '#67E0E3'  // 添加颜色属性来设置字体颜色为蓝色
            },
            detail: {
              offsetCenter: ['-40%', '120%']
            }
          },
          {
            value: this.$store.getters.getWindSpeed,
            name: '风速Km/h',
            title: {
              color: '#67E0E3'  // 添加颜色属性来设置字体颜色为蓝色
            },
          },
          {
            value: this.$store.getters.getWeatherFeelsLike,
            name: '体感温度',
            title: {
              offsetCenter: ['40%', '95%'],
              color: '#67E0E3'  // 添加颜色属性来设置字体颜色为蓝色
            },
            detail: {
              offsetCenter: ['40%', '120%']
            }
          }
        ];
        this.options = {
          series: [
            {
              type: 'gauge',
              min: -40,
              max: 60,
              anchor: {
                show: true,
                showAbove: true,
                size: 18,
                color: '#7BE188'
           
              },
              pointer: {
                icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
                width: 3,
                length: '85%',
                offsetCenter: [0, '8%']
              },
              progress: {
                show: true,
                overlap: true,
                roundCap: true
              },
              axisLine: {
                roundCap: true,

              },
              data: gaugeData,
              title: {
                fontSize: 20
              },
              detail: {
                width: 24, //色块
                height: 20,
                fontSize: 20,
                color: '#fff',
                backgroundColor: 'inherit',
                borderRadius: 3,
                formatter: '{value}'
              }
            }
          ]

        }
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped></style>