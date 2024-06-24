<!--
 * @Author: 洛白BG 642160753@qq.com
 * @Date: 2024-05-20 11:04:24
 * @LastEditors: 洛白BG 642160753@qq.com
 * @LastEditTime: 2024-06-08 12:13:22
 * @Description: 
-->
<template>
  <div>
    <Echart :options="options" id="polluting-elements" height="330px" width="290px"></Echart>
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
      handler(newData) { //newData
        this.options = {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          calculable: true,
          legend: {
            orient: "horizontal",
            //icon: "circle",
            bottom: 0,
            x: "center",
            //data: newData.xData,
            textStyle: {
              color: "#fff",
              fontSize: 15,
              fontWeight: 610
            }
          },
          series: [
            {
              name: "污染物 μg/m³",
              type: "pie",
              //radius: [15, 120],
              //roseType: "area",
              radius: ['40%', '80%'],
        
              center: ["50%", "40%"],
              data: newData.seriesData,
              label: {
                //show:false,
                position: 'inside', // 将label标签放到图形上
                color: '#fff'
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