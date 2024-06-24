import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

Vue.use(Vuex)

const storedTheme = Cookies.get('theme') || 'default';
export default new Vuex.Store({
  state: {
    region: {
      name: '',
      ip: '',
      id: '',
      lat: 0,
      lon: 0,
      JWD:''
    },
    weather:{
      temp:0,
      feelsLike:0, //体感温度
      windSpeed:0,// 风速
    },
    livingIndex: [],//生活指数
    theme: storedTheme // 默认主题
  },
  mutations: {
    setLocationData(state, data) {
      console.log("=========setLocationData==========")
      console.log(data)
      state.region = data;
    },
    setLocationWeather(state, data) {
      console.log("=========setLocationWeather==========")
      console.log(data)
      state.weather = data;
    },
    setLivingIndex(state, payload) {
      state.livingIndex = payload;
      console.log("=========setLivingIndex==========")
      console.log(state.livingIndex)
    },
    setTheme(state, theme) {
      state.theme = theme;
    }
  },
  actions: {
    setTheme({ commit }, theme) {
      commit('setTheme', theme);
    }
  },
  modules: {
  },
  getters: {
    getRegionName: state => state.region.name,
    getRegionId: state => state.region.id,
    getRegionIp: state => state.region.ip,
    getRegionlat: state => state.region.lat,
    getRegionlon: state => state.region.lon,
    getRegionJWD: state => state.region.JWD,
    getWeatherTemp:state => state.weather.temp,
    getWeatherFeelsLike:state => state.weather.feelsLike,
    getWindSpeed:state => state.weather.windSpeed,
    getLivingIndex:state => state.livingIndex,
    theme: state => state.theme
  },
})
