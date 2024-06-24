<template>
  <div>
    <Echart :options="options" id="air-quality-forecast" height="400px" width="340px"></Echart>
  </div>
</template>

<script>
import Echart from '@/common/echart'

export default {
  data() {
    return {
      options: {},

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
      handler(nowData) {
        // 固定样式数据
        const spirit =
          'image://data:image/png;base64,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';
        var maxData = 500;

        this.options = {

          tooltip: {},
          xAxis: {
            show: false,
            max: maxData,
            splitLine: { show: false },
            offset: 10,
            axisLine: {
              lineStyle: {
                color: '#0F84A5'
              }
            },
            axisLabel: {
              margin: 10,
              color: '#fff' // 将x轴上的字体颜色设置为白色
            },

          },
          yAxis: {
            data: nowData.time,//['6/7', '6/8', '6/9', '6/10', '11/11'],
            inverse: true,
            axisTick: { show: false },
            axisLine: { show: false },
            axisLabel: {
              margin: 10,
              color: '#999',
              fontSize: 16
            }
          },
          grid: {
            top: 'center',
            height: 300,
            left: 55,
            right: 95
          },
          series: [
            {
              // current data
              type: 'pictorialBar',
              symbol: spirit,
              symbolRepeat: 'fixed',
              symbolMargin: '5%',
              symbolClip: true,
              symbolSize: 30,
              symbolBoundingData: maxData,
              data: nowData.current_data,//[81, 20, 60, 70, 459],
              markLine: {
                symbol: 'none',
                label: {
                  formatter: 'max: {c}',
                  position: 'start',
                  color: '#fff',
                  fontSize: 18
                },
                lineStyle: {
                  color: 'green',
                  type: 'dotted',
                  opacity: 0.2,
                  width: 2,

                },
                data: [
                  {
                    type: 'max'
                  }
                ]
              },
              z: 10
            },
            {
              // full data
              type: 'pictorialBar',
              itemStyle: {
                opacity: 0.2
              },
              label: {
                show: true,
                opacity: 1,
                formatter: function (params) {
                  var value = params.value;
                  var level = '';
                  var color = '';

                  if (value >= 0 && value <= 50) {
                    level = '优';
                    color = 'green';
                  } else if (value >= 51 && value <= 100) {
                    level = '良';
                    color = 'yellow';
                  } else if (value >= 101 && value <= 150) {
                    level = '轻度污染';
                    color = 'orange';
                  } else if (value >= 151 && value <= 200) {
                    level = '中度污染';
                    color = 'red';
                  } else if (value >= 201 && value <= 300) {
                    level = '重度污染';
                    color = 'purple';
                  } else if (value >= 301 && value <= 500) {
                    level = '严重污染';
                    color = 'brown';
                  }

                  return `{${color}|${level}}`;
                },
                position: 'right',
                offset: [5, 0],
                rich: {
                  green: {
                    color: 'green',
                    fontSize: 22
                  },
                  yellow: {
                    fontSize: 22,
                    color: 'yellow'
                  },
                  orange: {
                    fontSize: 18,
                    color: 'orange'
                  },
                  red: {
                    fontSize: 18,
                    color: 'red'
                  },
                  purple: {
                    fontSize: 18,
                    color: '#99004C'
                  },
                  brown: {
                    fontSize: 18,
                    color: '#7E0023'
                  }
                },
                
              },
              animationDuration: 0,
              symbolRepeat: 'fixed',
              symbolMargin: '5%',
              symbol: spirit,
              symbolSize: 30,
              symbolBoundingData: maxData,
              data: nowData.true_data,//[81, 230, 60, 70, 41],
              z: 5
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