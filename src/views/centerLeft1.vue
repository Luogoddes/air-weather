<template>
  <div id="centerLeft1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <div class="d-flex">
          <span class="text mx-2">天气预警</span>
          <dv-decoration-3 class="dv-dec-3" />
        </div>
      </div>
      <div class="jc-center">
        <WeatherWarning :warnings="warnings"/>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex';
import WeatherWarning from '@/components/WeatherWarning.vue'
export default {
  computed: {
    ...mapState({
      region: state => state.region,
    }),
  },
  watch: {
    'region.id': function (newId) {
      if (newId) {
        //alert("center 监听到地区值改变，开始轮询数据:" + newId)
        this.getWarningInfo(newId);
      }
    }
  },
  mounted() {
    if (this.region.id) {
      //alert("center 有")
      this.getWarningInfo(this.region.id);
    } 
    // else {
    //   alert("center 没有")
    // }
  },
  data() {
    return {
      warnings: [],
    }
  },
  components: {
    WeatherWarning
  },
  methods: {
    getWarningInfo(location) {
      axios.get(`https://devapi.qweather.com/v7/warning/now?location=${location}&key=${this.$apiKey}`)
        .then(response => {
          this.warnings = response.data.warning;
          console.log("=======天气预警======");
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error fetching Warning info:', error);
        });
    },
  }
}
</script>

<style lang="scss" scoped>
$box-width: 300px;
$box-height: 410px;

#centerLeft1 {
  padding: 16px;
  height: $box-height;
  width: $box-width;
  border-radius: 10px;
  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .dv-dec-3 {
    position: relative;
    width: 100px;
    height: 20px;
    top: -3px;
  }

  .bottom-data {
    .item-box {
      & > div {
        padding-right: 5px;
      }
      font-size: 14px;
      float: right;
      position: relative;
      width: 50%;
      color: #d3d6dd;
      .dv-digital-flop {
        width: 120px;
        height: 30px;
      }
      // 金币
      .coin {
        position: relative;
        top: 6px;
        font-size: 20px;
        color: #ffc107;
      }
      .colorYellow {
        color: yellowgreen;
      }
      p {
        text-align: center;
      }
    }
  }
}
</style>
