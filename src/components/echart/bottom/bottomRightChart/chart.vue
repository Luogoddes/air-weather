<!--
 * @Author: 洛白BG 642160753@qq.com
 * @Date: 2024-05-20 11:04:24
 * @LastEditors: 洛白BG 642160753@qq.com
 * @LastEditTime: 2024-06-08 16:38:56
 * @Description: 
-->
<template>
  <div>
    <Echart :options="options" id="rain" height="280px" width="100%"></Echart>
  </div>
</template>

<script>
import Echart from '@/common/echart'
export default {
  data() {
    return {
      options: {},
    }
  },
  components: {
    Echart
  },
  props: {
    cdata: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    cdata: {
      handler(newData) {
        this.options = {
          grid: {
            opacity: 0.3,
            show: false, // 将网格线设置为不显示
            borderWidth: 0, // 将边框宽度设置为0
          },
          title: {
            text: '降雨量 vs 降雪量 --mm',
            subtext: newData.summary
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['降雨量', '降雪量'],
            textStyle: {
              color: '#fff'
            }
          },
          toolbox: {
            show: true,
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar'] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              // prettier-ignore
              axisLabel: {
                color: '#fff' // 将x轴上的字体颜色设置为白色
              },
              data: newData.time//['08:00', '08:10', '08:20', '08:30', '08:40', '08:50', '09:00', '09:10', '09:20', '09:30', '09:40', '09:50']
            }
          ],
          yAxis: [
            {
              show: false,
              type: 'value',
              axisLabel: {
                formatter: '{value} °C',
                color: 'white'
              }
            }
          ],
          series: [
            {
              name: '降雨量',
              type: 'bar',
              data: newData.rain,//[2.0, 4.9, 7.0, 3.2, 5.6, 6.7, 5.6, 6.2, 3.6, 2.0, 6.4, 3.3],
              markPoint: {
                data: [{
                  type: "max",
                  symbol: "pin",
                  symbolSize: 50,
                  animation: true,
                  label: {
                    show: true,
                    color: '#000'
                  },
                },
                {
                  type: "min",
                  symbol: "pin",
                  symbolSize: 50,
                  animation: true,
                  label: {
                    show: true,
                    color: '#000'
                  },
                }]
              },
              markLine: {
                data: [{ type: 'average', name: 'Avg' }]
              },

            },
            {
              name: '降雪量',
              type: 'bar',
              data: newData.snow,//[2.6, 5.9, 9.0, 6.4, 8.7, 6.7, 5.6, 8.2, 8.7, 8.8, 6.0, 2.3],
              markPoint: {
                data: [{
                  type: "max",
                  symbol: "pin",
                  symbolSize: 50,
                  animation: true,
                  label: {
                    show: true,
                    color: '#000'
                  },
                },
                {
                  type: "min",
                  symbol: "pin",
                  symbolSize: 50,
                  animation: true,
                  label: {
                    show: true,
                    color: '#000'
                  },
                }]
              },
              markLine: {
                data: [{ type: 'average', name: 'Avg' }]
              }
            }
          ]
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
