<template>

  <div id="temp7day" style="width: 100%; height: 480px"></div>

</template>

<script>
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
    // else {
    //   alert("temp7daty 没有")
    // }
  },
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
      nowData: {
        time: [],     //时间
        textDay: [],  //白天天气描述
        windDirDay_windScaleDay: [],  //风向风速
        tempMax: [],  //最高气温
        tempMin: [],  //最低气温
        precip: [],   //降雨量
        uvIndex: [],  //紫外线强度
      }
    }
  },

  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      const myChart = this.$echarts.init(document.getElementById("temp7day"));
      // 指定图表的配置项和数据
      const option = {
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
            data: this.nowData.time,
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
            data: this.nowData.textDay,
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
            data: this.nowData.windDirDay_windScaleDay,
          }
        ],
        yAxis: {
          type: 'value',
          show: true, //是否显示背景
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
            data: this.nowData.tempMax,//,
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
            data: this.nowData.tempMin,//
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
            data: this.nowData.precip,//
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
            data: this.nowData.uvIndex,//
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
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    // drawTimingFn() {
    //   this.getWeatherInfo();
    //   this.drawTiming = setInterval(() => {
    //     this.getWeatherInfo();
    //   }, 600000);   //600000（10分钟的毫秒数）
    // },
    getWeatherInfo(location) {
      //const location = this.$store.getters.getRegionId;
      //alert("temp7day-：" + location)
      axios.get(`https://devapi.qweather.com/v7/weather/7d?location=${location}&key=${this.$apiKey}`)
        .then(response => {
          const data = response.data.daily
          console.log("=====temp7day=====");
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
          this.drawChart();
        })
        .catch(error => {
          console.error('Error fetching temp7day info:', error);
          this.nowData.time = ["25日", "26日", "27日", "28日", "29日", "30日", "31日"];     //时间
          this.nowData.textDay = ["小雨", "小雨", "阴", "小雨", "多云", "小雨", "小雨"];  //白天天气描述
          this.nowData.windDirDay_windScaleDay = ["东北风 1级", "东北风 1级", "东北风 1级", "东北风 1级", "东北风 1级", "东北风 1级", "东北风 1级"]; //风向风速
          this.nowData.tempMax = ["16.3", "16.2", "17.6", "14.2", "17.6", "25.7", "14.3"];  //最高气温
          this.nowData.tempMin = ["13.4", "12.8", "13.5", "12.5", "12.4", "13.2", "13"];  //最低气温
          this.nowData.precip = ["3.3", "6.2", "7.6", "4.2", "7.6", "5.7", "4.3"];   //降雨量
          this.nowData.uvIndex = ["3", "6", "6", "2", "6", "7", "4"]; //紫外线强度

        });
    },


  }


}
</script>