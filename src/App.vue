<!--
 * @Author: 洛白BG 642160753@qq.com
 * @Date: 2024-05-20 11:04:24
 * @LastEditors: niu luogoddes@qq.com
 * @LastEditTime: 2024-06-24 22:58:40
 * @Description: 
-->
<!--
 * @Author: 洛白BG 642160753@qq.com
 * @Date: 2024-05-20 11:04:24
 * @LastEditors: 洛白BG 642160753@qq.com
 * @LastEditTime: 2024-06-12 23:14:57
 * @Description: 
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: '',
  data() {
    return {
      region: {
        name: null,
        id: null,
        ip: null,
        lat: null,
        lon: null,
        JWD: null,
        JWD2: null
      },
    }
  },
  created() {
    this.checkCookieData();
  },
  methods: {
    checkCookieData() {
      this.getIpInfo();
      const regionFromCookie = this.$cookie.get('region');
      console.log(regionFromCookie)
      //this.getLocationData();
      if (regionFromCookie) {
        // 从 cookie 中读取 region 信息
        //this.region=regionFromCookie;
        this.$store.commit('setLocationData', JSON.parse(regionFromCookie));
      } else {
        //alert("cookie 中没有 region 信息,则调用 getLocationData 方法")
        // 如果 cookie 中没有 region 信息,则调用 getLocationData 方法
        this.getLocationData();
      }
    },
    async getLocationData() {
      console.log("3-app-getLocationData");

      axios.get('/api-region')
        .then(response => {
          this.region = {
            name: response.data.region,
            ip: response.data.ip,
            lat: response.data.latitude,
            lon: response.data.longitude,
            JWD: response.data.longitude + ',' + response.data.latitude,
          };
          console.log("4-app");
          console.log(this.region);
          this.getGeoInfo(this.region.name);
        })
        .catch(error => {
          console.error('Error fetching IP and location info:', error);
        });
    },
    getGeoInfo(location) {
      axios.get(`https://geoapi.qweather.com/v2/city/lookup?location=${location}&key=${this.$apiKey}`)
        .then(response => {
          this.region.id = response.data.location[0].id;
          console.log("5-app");
          console.log(this.region.id);
          this.storeData();
        })
        .catch(error => {
          console.error('Error fetching geo info:', error);
        });
    },
    storeData() {
      // 将 ipInfo 和 geoInfo 存储到 cookie 和 Vuex store 中
      this.$cookie.set("region", JSON.stringify(this.region), '7d');
      this.$store.commit('setLocationData', this.region);
    },
    
    
  }
}

</script>
<style lang="scss" scoped>
#app {
  width: 100vw;
  height: 100vh;
  background-color: #020308;
  overflow: hidden;
}
</style>
