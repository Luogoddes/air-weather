<template>
  <div id="index" ref="appRef">
    <div class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
        <div class="d-flex jc-center">
          <dv-decoration-10 class="dv-dec-10" />
          <div class="d-flex jc-center">
            <dv-decoration-8 class="dv-dec-8" :color="decorationColor" />
            <div class="title">
              <span class="title-text">全方位天气状况监控</span>
              <dv-decoration-6 class="dv-dec-6" :reverse="true" :color="['#50e3c2', '#67a1e5']" />
            </div>
            <dv-decoration-8 class="dv-dec-8" :reverse="true" :color="decorationColor" />
          </div>
          <dv-decoration-10 class="dv-dec-10-s" />
        </div>

        <!-- 第二行 -->
        <div class="d-flex jc-between px-2">
          <div class="d-flex aside-width">
            <div class="react-left ml-4 react-l-s">
              <span class="react-left"></span>
              <span class="text">地区：
                <el-cascader size="large" :options="pcaTextArr" v-model="selectedOptions"
                  style="width: 300px;background-color: #ffffff14 !important;">
                </el-cascader>
                <el-link @click="saveData()" type="primary" style="margin-left: 10px;font-size: large;">保存</el-link>

              </span>

            </div>
            <div class="react-left ml-3">
              <span class="text" v-if="this.$store.getters.getRegionIp != ''">
                {{ this.$store.getters.getRegionIp }}
              </span>
              <el-link class="text" v-else @click="changeIP()" type="primary" style="font-size: large;">
                使用IP地址
              </el-link>


            </div>
          </div>
          <div class="d-flex aside-width">
            <div class="react-right bg-color-blue mr-3">
              <span class="text fw-b">
                {{ this.$store.getters.getRegionName }}
              </span>
            </div>
            <div class="react-right mr-4 react-l-s">
              <span class="react-after"></span>
              <span class="text" style="margin-right: 15px;">
                <el-dropdown trigger="click" @command="handleCommand">
                  <span class="el-dropdown-link">
                    选择主题<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="default">默认</el-dropdown-item>
                    <el-dropdown-item command="shine">shine</el-dropdown-item>
                    <el-dropdown-item command="macarons">macarons</el-dropdown-item>
                    <el-dropdown-item command="infographic">infographic</el-dropdown-item>
                    <el-dropdown-item command="roma">roma</el-dropdown-item>
                    <el-dropdown-item command="wonderland">wonderland</el-dropdown-item>
                    <el-dropdown-item command="walden">walden</el-dropdown-item>
                    <el-dropdown-item command="essos">essos</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown></span>
              <span class="text">{{ dateYear }} {{ dateWeek }} {{ dateDay }}</span>
            </div>
          </div>
        </div>

        <div class="body-box">
          <!-- 第三行数据 -->
          <div class="content-box">
            <div>
              <dv-border-box-12>
                <centerLeft1 />
              </dv-border-box-12>
            </div>
            <div>
              <dv-border-box-12>
                <centerLeft2 />
              </dv-border-box-12>
            </div>
            <!-- 中间 -->
            <div>
              <center />
            </div>
            <!-- 中间 -->
            <div>
              <centerRight2 />
            </div>
            <div>
              <dv-border-box-13>
                <centerRight1 />
              </dv-border-box-13>
            </div>
          </div>

          <!-- 第四行数据 -->
          <div class="bottom-box">
            <dv-border-box-13>
              <bottomLeft />
            </dv-border-box-13>
            <dv-border-box-12>
              <bottomRight />
            </dv-border-box-12>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import { pcaTextArr } from "element-china-area-data";//三级联动（省、市、区）
//import region from "../components/region.vue";
import drawMixin from "../utils/drawMixin";
import { formatTime } from '../utils/index.js'
import centerLeft1 from './centerLeft1'
import centerLeft2 from './centerLeft2'
import centerRight1 from './centerRight1'
import centerRight2 from './centerRight2'
import center from './center'
import bottomLeft from './bottomLeft'
import bottomRight from './bottomRight'
import Cookies from 'js-cookie'
export default {
  mixins: [drawMixin],
  data() {
    return {
      timing: null,
      loading: true,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      decorationColor: ['#568aea', '#000000'],
      pcaTextArr,
      selectedOptions: [],//三级联动（省、市、区）
      dialogRegionVisible: false,
      region: {
        name: null,
        id: null,
        ip: this.$store.getters.getRegionIp,
        lat: null,
        lon: null,
        JWD: null
      },
    }
  },
  components: {
    centerLeft1,
    centerLeft2,
    centerRight1,
    centerRight2,
    center,
    bottomLeft,
    bottomRight
  },
  mounted() {
    this.timeFn()
    this.cancelLoading()
  },
  beforeDestroy() {
    clearInterval(this.timing)
  },
  methods: {
    ...mapActions(['setTheme']),
    handleCommand(command) {
        this.$message.success('选择的主题为：' + command);
        Cookies.set('theme', command, { expires: 365 }); // 设置Cookie，过期时间为365天
        this.setTheme(command);
        
      },
    timeFn() {
      this.timing = setInterval(() => {
        this.dateDay = formatTime(new Date(), 'HH: mm: ss')
        this.dateYear = formatTime(new Date(), 'yyyy-MM-dd')
        this.dateWeek = this.weekday[new Date().getDay()]
      }, 1000)
    },
    cancelLoading() {
      setTimeout(() => {
        this.loading = false
      }, 600)
    },
    changeIP() {
      //删除cookie里的region
      this.$cookie.remove('region');
      //刷新整个页面
      window.location.reload();
    },
    saveData() {
      console.log('Selected Options:', this.selectedOptions[2])
      // 首先判断 selectedOptions 是否为空
      if (this.selectedOptions.length == 0) {
        this.$message.warning('请选择选项')
      } else {
        // 调用 getGeoInfo 方法
        this.getGeoInfo(this.selectedOptions);
      }

    },
    getGeoInfo(location) {
      axios.get(`https://geoapi.qweather.com/v2/city/lookup?location=${location}&key=5f017c6d7edb4a7ba9fe4f491a2900ca`)
        .then(response => {
          let region = response.data.location
          console.log("index-getGeoInfo");
          //console.log(region)
          // 查找匹配 this.selectedOptions[2] 的元素
          let selectedRegion = region.find(item => item.name == location[2].replace(/区$|县$|市$/, ''));
          console.log(selectedRegion)
          if (selectedRegion) {
            //获取需要的属性值
            this.region.name = location[0] + location[1] + location[2];
            this.region.id = selectedRegion.id
            this.region.lat = selectedRegion.lat
            this.region.lon = selectedRegion.lon
            this.region.JWD = selectedRegion.lon + ',' + selectedRegion.lat

            // 保存到cookie
            this.$cookie.set("region", JSON.stringify(this.region))

            // 保存到vuex
            this.$store.commit('setLocationData', this.region)
            window.location.reload()
            this.$message.success('保存成功')
          } else {
            console.error('Region not found')
          }
          //this.storeData()
        })
        .catch(error => {
          console.error('Error fetching geo info:', error)
        })
    },
    storeData() {
      // 在这里实现保存数据的逻辑
      console.log('数据已保存')
    }
  }
}
</script>

<style lang="scss">
.el-input__inner {
  background-color: transparent !important;
  color: aliceblue;
}

@import '../assets/scss/index.scss';

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
  font-size: 19px;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>
