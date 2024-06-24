<!--
 * @Author: 洛白BG 642160753@qq.com
 * @Date: 2024-05-20 11:04:24
 * @LastEditors: 洛白BG 642160753@qq.com
 * @LastEditTime: 2024-06-13 09:41:56
 * @Description: 
-->
<template>
  <div>
    <Echart :options="options" id="living-index" height="280px" width="280px"></Echart>
  </div>
</template>

<script>
import Echart from '@/common/echart'
export default {
  data() {
    return {
      options: {},
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
        areaBtoG: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(35,184,210,.2)'
            },
            {
              offset: 1,
              color: 'rgba(35,184,210,0)'
            }
          ]
        }
      }
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
        // 固定样式数据
        let lineStyle = {
          normal: {
            width: 3,
            opacity: 1.8
          }
        };

        this.options = {
          tooltip: {
            trigger: 'item'
          },
          radar: {
            indicator: newData.indicatorData,
            //shape: "circle",
            splitNumber: 5,
            radius: ["0%", "55%"],
            name: {
              textStyle: {
                fontSize: 15,
                color: "rgb(238, 197, 102)"   //黄色
              }
            },
            axisLine: {
              lineStyle: {
                color: this.colorList.linearYtoG,
                opacity: 0.6
              }
            },
            splitLine: {
              lineStyle: {
                color: this.colorList.linearYtoG,
                opacity: 0.6
              }
            },

          },
          series: [
            {
              name: "生活指数", //提示标题
              type: "radar",
              lineStyle: lineStyle,
              data: [newData.livingIndexData],//newData.livingIndexData,
              symbol: "none",
              itemStyle: {
                normal: {
                  color: "#1286A6"    //深蓝
                }
              },
              areaStyle: {
                normal: {
                  opacity: 0.3
                }
              },
            },
          ]
        }
      },
      immediate: true,
      deep: true
    }
  }
};
</script>