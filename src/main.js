/*
 * @Author: 洛白BG 642160753@qq.com
 * @Date: 2024-05-20 11:04:24
 * @LastEditors: 洛白BG 642160753@qq.com
 * @LastEditTime: 2024-06-08 13:44:46
 * @Description: 
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import dataV from '@jiaminghi/data-view';
// 引入全局css
import './assets/scss/style.scss';
// 按需引入vue-awesome图标
import Icon from 'vue-awesome/components/Icon';
// import 'vue-awesome/icons/chart-bar.js';
// import 'vue-awesome/icons/chart-area.js';
//import 'vue-awesome/icons/chart-pie.js';
// import 'vue-awesome/icons/chart-line.js';
// import 'vue-awesome/icons/align-left.js';


//引入echart   

import * as echarts from 'echarts';
//import 'echarts-gl';
Vue.prototype.$echarts = echarts //可以全局使用 不用每次使用需要在页面导入


Vue.prototype.$apiKey = '5f017c6d7edb4a7ba9fe4f491a2900ca';

Vue.config.productionTip = false;

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Cookie from "js-cookie";  //引入
Vue.prototype.$cookie = Cookie;  //挂载全局

// 全局注册
Vue.component('icon', Icon);
Vue.use(dataV);
Vue.use(ElementUI);


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
