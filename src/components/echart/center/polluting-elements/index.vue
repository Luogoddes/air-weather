<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import axios from 'axios'
import Chart from './chart.vue';
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
        //alert("空气元素index 监听到地区值改变:" + newId)
        this.getAirInfo(newId);
      }
    }
  },
  mounted() {
    if (this.region.id) {
      //alert("空气元素index 有")
      this.getAirInfo(this.region.id);
    } 
    // else {
    //   alert("空气元素index 没有")
    // }
  },
  data() {
    return {
      cdata: {
        xData: ["PM2.5", "PM10", "O₃", "NO₂", "SO₂", "CO"],
        seriesData: []
      }
    }
  },
  components: {
    Chart,
  },
  methods: {
    getAirInfo(location) {
      axios.get(`https://devapi.qweather.com/v7/air/now?location=${location}&key=${this.$apiKey}`)
        .then(response => {
          const data = response.data.now;
          console.log("=======空气元素index======");
          //console.log(data);
          // 将数据赋值给cdata对象
          this.cdata.seriesData = [
            { value: data.pm2p5, name: "PM2.5", unit: "μg/m³" },
            { value: data.pm10, name: "PM10", unit: "μg/m³" },
            { value: data.o3 * 2, name: "O₃", unit: "μg/m³" },
            { value: data.no2 * 1.9, name: "NO₂", unit: "μg/m³" },
            { value: data.so2 * 2.6, name: "SO₂", unit: "μg/m³" },
            { value: data.co * 114.6, name: "CO", unit: "μg/m³" }
          ]

        })
        .catch(error => {
          console.error('Error fetching Warning info:', error);
        });
    },
  }
}
</script>

<style lang="scss" scoped></style>