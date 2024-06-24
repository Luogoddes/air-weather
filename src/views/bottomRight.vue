<!--
 * @Author: 洛白BG 642160753@qq.com
 * @Date: 2024-05-20 11:04:24
 * @LastEditors: 洛白BG 642160753@qq.com
 * @LastEditTime: 2024-06-09 19:08:08
 * @Description: 
-->
<template>
  <div id="bottomRight">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-area" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="text mx-2">天气生活指数预报-未来两小时降雨量</span>

        </div>
      </div>
      <div class="d-flex jc-center body-box">
        <dv-scroll-board v-if="flag" class="dv-scr-board" :config="config" />
      </div>
      <BottomRightChart />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios'
import BottomRightChart from "@/components/echart/bottom/bottomRightChart";
export default {
  components: {
    BottomRightChart
  },
  computed: {
    ...mapState({
      region: state => state.region,
    }),
  },
  watch: {
    'region.id': function (newId) {
      if (newId) {
        //alert("生活数据指数 监听到地区值改变，开始轮询数据:" + newId)
        this.getIndicesInfo(newId);
      }
    }
  },
  mounted() {
    if (this.region.id) {
      //alert("生活数据指数 有")
      this.getIndicesInfo(this.region.id);
    } 
    // else {
    //   alert("生活数据指数 没有")
    // }
  },
  data() {
    return {
      flag:false,
      config: {
        header: ['组件', '类型', '说明'],
        data: [
          // ['运动指数', "<span class='colorGrass'>较适宜</span>", "属中等强度紫外线辐射天气，外出时建议涂擦SPF高于15、PA+的防晒护肤品，戴帽子、太阳镜。"],
          // ['洗车指数', "<span class='colorRed'>较不宜</span>", "属中等强度紫外线辐射天气，外出时建议涂擦SPF高于15、PA+的防晒护肤品，戴帽子、太阳镜。"],
        ],
        rowNum: 5, //表格行数
        headerHeight: 35,
        headerBGC: '#0f1325', //表头
        oddRowBGC: '#0f1325', //奇数行
        evenRowBGC: '#171c33', //偶数行
        index: true,
        columnWidth: [12, 110, 80, 750], // 设置列宽度
        align: ['left', 'left', 'center', 'left']
      }
    }
  },
  methods: {
    getIndicesInfo(location) {
      
      //const location = this.$store.getters.getRegionId;
      //alert("生活数据指数："+location)
      const colorMapping = {
        '运动指数': { 1: 'colorGrass', 2: 'colorGrass', 3: 'colorRed' },
        '洗车指数': { 1: 'colorGrass', 2: 'colorGrass', 3: 'colorGrass', 4: 'colorRed' },
        '穿衣指数': { 1: 'colorRed', 2: 'colorRed', 3: 'colorRed', 4: 'colorGrass', 5: 'colorGrass', 6: 'colorGrass', 7: 'colorRed' },
        '钓鱼指数': { 1: 'colorGrass', 2: 'colorGrass', 3: 'colorRed' },
        '紫外线指数': { 1: 'colorGrass', 2: 'colorGrass', 3: 'colorGrass', 4: 'colorRed', 5: 'colorRed' },
        '旅游指数': { 1: 'colorGrass', 2: 'colorGrass', 3: 'colorGrass', 4: 'colorRed', 5: 'colorRed' },
        '花粉过敏指数': { 1: 'colorGrass', 2: 'colorGrass', 3: 'colorGrass', 4: 'colorRed', 5: 'colorRed' },
        '舒适度指数': { 1: 'colorGrass', 2: 'colorGrass', 3: 'colorRed', 4: 'colorRed', 5: 'colorRed', 6: 'colorRed', 7: 'colorRed' },
        '感冒指数': { 1: 'colorGrass', 2: 'colorGrass', 3: 'colorRed', 4: 'colorRed' },
        '空气污染扩散条件指数': { 1: 'colorGrass', 2: 'colorGrass', 3: 'colorGrass', 4: 'colorRed', 5: 'colorRed' },
        '空调开启指数': { 1: 'colorGrass', 2: 'colorGrass', 3: 'colorGrass', 4: 'colorRed' },
        '太阳镜指数': { 1: 'colorGrass', 2: 'colorGrass', 3: 'colorRed', 4: 'colorRed', 5: 'colorRed' },
        '化妆指数': { 1: 'colorGrass', 2: 'colorGrass', 3: 'colorRed', 4: 'colorRed', 5: 'colorRed', 6: 'colorRed', 7: 'colorRed', 8: 'colorGrass' },
        '晾晒指数': { 1: 'colorGrass', 2: 'colorGrass', 3: 'colorGrass', 4: 'colorRed', 5: 'colorRed', 6: 'colorRed' },
        '交通指数': { 1: 'colorGrass', 2: 'colorGrass', 3: 'colorGrass', 4: 'colorRed', 5: 'colorRed' },
        '防晒指数': { 1: 'colorGrass', 2: 'colorGrass', 3: 'colorGrass', 4: 'colorRed', 5: 'colorRed' }
      };

      const filteredIndices = ['运动指数', '穿衣指数', '紫外线指数', '舒适度指数', '感冒指数', '晾晒指数'];
      const livingIndex = [];
      axios.get(`https://devapi.qweather.com/v7/indices/1d?type=0&location=${location}&key=${this.$apiKey}`)
        .then(response => {
          const daily = response.data.daily;
          console.log("=====生活指数区=====");
          //console.log(daily);
          this.config.data=[];
          daily.forEach(item => {
            if (colorMapping[item.name] && colorMapping[item.name][item.level]) {
              const colorClass = colorMapping[item.name][item.level];
              this.config.data.push([item.name, `<span class='${colorClass}'>${item.category}</span>`, item.text]);

              if (filteredIndices.includes(item.name)) {
                livingIndex.push(item.level);
              }
            } else {
              console.warn(`No color mapping found for ${item.name} with level ${item.level}`);
            }
          });

          //console.log(this.config.data)
          this.flag = true;
          // 存储到 Vuex
          this.$store.commit('setLivingIndex', livingIndex);
        })
        .catch(error => {
          console.error('Error fetching Indices-right info:', error);
        });
    }
  },
};
</script>

<style lang="scss" class>
$box-height: 520px;
$box-width: 100%;

#bottomRight {
  padding: 14px 16px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;

  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }

  .text {
    color: #c3cbde;
  }

  .chart-box {
    margin-top: 16px;
    width: 170px;
    height: 170px;

    .active-ring-name {
      padding-top: 10px;
    }
  }

  .body-box {
    border-radius: 5px;
    overflow: hidden;

    .dv-scr-board {
      height: 210px;
    }
  }
}
</style>