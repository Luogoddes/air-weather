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
        //alert("空气质量5天 监听到地区值改变:" + newId)
        this.getAirQuatilyInfo(newId);
      }
    }
  },
  mounted() {
    if (this.region.id) {
      //alert("空气质量5天 有")
      this.getAirQuatilyInfo(this.region.id);
    }
    // else {
    //   alert("空气质量5天 没有")
    // }
  },
  data() {
    return {
      cdata: {
        time: ['6/7', '6/8', '6/9', '6/10', '11/11'],
        current_data: [419, 270, 440, 370, 459],
        true_data: [81, 230, 60, 130, 41], //这个数据是空气质量的真实aqi，上面那是是他的补，也就是500 - true_data
      }
    }
  },
  components: {
    Chart,
  },
  methods: {
    getAirQuatilyInfo(location) {
      axios.get(`https://devapi.qweather.com/v7/air/5d?location=${location}&key=${this.$apiKey}`)
        .then(response => {
          //const data = response.data.now;
          console.log("=======空气质量5天======");
          //console.log(response.data.daily);
          
          this.cdata.time = response.data.daily.map(item => this.formatDate(item.fxDate));
          this.cdata.true_data = response.data.daily.map(item => parseInt(item.aqi));
          this.cdata.current_data = response.data.daily.map(item => 500 - parseInt(item.aqi));
        })
        .catch(error => {
          console.error('Error fetching air-quality info:', error);
        });
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }
  }
}
</script>