<template>
  <div>
    <!-- 年度开工率 -->
    <Echart :options="options" id="bottomLeftChart" height="480px" width="100%"></Echart>
  </div>
</template>

<script>
import Echart from '@/common/echart'
export default {
  data() {
    return {
      options: {},
      // 定义颜色
      colorList: {
        linearYtoG: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#f5b44d'
            },
            {
              offset: 1,
              color: '#28f8de'
            }
          ]
        },
        linearGtoB: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: '#43dfa2'
            },
            {
              offset: 1,
              color: '#28f8de'
            }
          ]
        },
        linearBtoG: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: '#1c98e8'
            },
            {
              offset: 1,
              color: '#28f8de'
            }
          ]
        },
      },
    };
  },
  components: {
    Echart,
  },
  props: {
    cdata: {
      type: Object,
      default: () => ({})
    },
  },
  watch: {
    cdata: {
      handler(newData) {
        this.options = {
          grid: {
            show: true,
            //backgroundColor: 'transparent',
            opacity: 0.3,
            borderWidth: '0',
            top: '160',
            bottom: '35'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['降雨量/毫米', '紫外线'],
            top: '100px', // 调整图例距离顶部的位置
            right: '20px',
            textStyle: {
              color: '#fff',
              fontSize: 15
            }
          },
          xAxis: [
            // 日期
            {
              type: 'category',
              boundaryGap: false,
              position: 'top',
              offset: 130,
              zlevel: 100,
              axisLine: {
                lineStyle: {
                  color: "#B4B4B4"
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                interval: 0,
                formatter: [
                  '{a|{value}}'
                ].join('\n'),
                rich: {
                  a: {
                    color: 'white',
                    fontSize: 20
                  }
                }
              },
              data: newData.time,
            },
            // 天气图标
            {
              type: 'category',
              boundaryGap: false,
              position: 'top',
              offset: 95,
              zlevel: 100,
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              nameTextStyle: {
                fontWeight: 'bold',
                fontSize: 29
              },
              axisLabel: {
                interval: 0,
                formatter: [
                  '{a|{value}}'
                ].join('\n'),
                rich: {
                  a: {
                    color: 'white',
                    fontSize: 20
                  }
                }
              },
              // data: this.weatherdata.weather
              data: newData.textDay,
            },
            // 天气风向-风力
            {
              type: 'category',
              boundaryGap: false,
              position: 'top',
              offset: 65,
              zlevel: 100,
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              nameTextStyle: {
                fontWeight: 'bold',
                fontSize: 29
              },
              axisLabel: {
                interval: 0,
                formatter: [
                  '{a|{value}}'
                ].join('\n'),
                rich: {
                  a: {
                    color: 'white',
                    fontSize: 18
                  }
                }
              },
              // data: this.weatherdata.weather
              data: newData.windDirDay_windScaleDay,
            }
          ],
          yAxis: {
            type: 'value',
            show: false, //是否显示背景（会有黑白块）
            offset: 30, // 向右移动30像素
            splitLine: {
              show: true,
              lineStyle: {
                color: '#fff',
                opacity: 0.1
              }
            },
            axisLabel: {
              formatter: '{value} °C',
              color: 'white'
            }
          },
          series: [
            {
              name: '最高气温',
              type: 'line',
              data: newData.tempMax,//,
              symbol: 'emptyCircle',
              symbolSize: 10,
              showSymbol: true,
              smooth: true,
              itemStyle: {
                color: '#55E2A9'
              },
              label: {
                show: true,
                position: 'top',
                color: 'white',
                fontSize: 19,
                formatter: '{c} °C'
              },
              lineStyle: {
                normal: {
                  color: this.colorList.linearBtoG,
                  width: 5
                }
                // color: 'white'
              },
              areaStyle: {
                opacity: 1,
                color: 'transparent'
              }
            },
            {
              name: '最低气温',
              type: 'line',
              data: newData.tempMin,//
              symbol: 'emptyCircle',
              symbolSize: 10,
              showSymbol: true,
              smooth: true,
              itemStyle: {
                normal: {
                  color: '#55E2A9',
                  opacity: 0.6
                }
              },
              label: {
                show: true,
                position: 'bottom',
                color: 'white',  //线上的颜色
                fontSize: 19,
                formatter: '{c} °C'
              },
              lineStyle: {
                normal: {
                  color: this.colorList.linearYtoG,
                  width: 5
                }
                // color: 'white'
              },
              areaStyle: {
                opacity: 1,
                color: 'transparent'
              }
            },
            {
              name: '降雨量/毫米',
              type: 'bar',
              data: newData.precip,//
              smooth: true,
              barWidth: '30%', // 调整柱子的宽度为总宽度的40%
              itemStyle: {
                color: '#32C5E9',
                //头部为圆角
                normal: {
                  barBorderRadius: [5, 5, 0, 0],
                }
              },
              label: {
                show: true,
                position: 'inside', // 设置数据标签显示位置为柱子内部
                color: 'white',
                fontSize: 19,
                formatter: '{c}'
              },
              markLine: {
                data: [{ type: 'average', name: 'Avg' }],
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff', // 设置字体颜色
                    fontSize: 19 // 设置字体大小
                  }
                }
              },
            },
            {
              name: '紫外线',
              type: 'bar',
              data: newData.uvIndex,//
              smooth: true,
              barWidth: '30%', // 调整柱子的宽度为总宽度的40%
              itemStyle: {
                color: '#32C5E9',
                //头部为圆角
                normal: {
                  barBorderRadius: [5, 5, 0, 0],
                }
              },
              label: {
                show: true,
                position: 'inside', // 设置数据标签显示位置为柱子内部
                color: 'white',
                fontSize: 19,
                formatter: '{c}'
              },
              markLine: {
                data: [{ type: 'average', name: 'Avg' }],
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff', // 设置字体颜色
                    fontSize: 19 // 设置字体大小
                  }
                }
              },

            },

          ]
        }
      },
      immediate: true,
      deep: true
    },
  },
}
</script>