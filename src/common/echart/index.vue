<!-- <template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
//import tdTheme from './theme.json' // 引入默认主题
//import tdTheme from './shine.json'
//import tdTheme from './macarons.json'
 import tdTheme from './infographic.json'
// import tdTheme from './roma.json'

//import tdTheme from './wonderland.json'

//import tdTheme from './walden.json'
//import tdTheme from './essos.json'




export default {
  name: 'echart',
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '2.5rem'
    },
    options: {
      type: Object,
      default: ()=>({})
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    options: {
      handler (options) {
        // 设置true清空echart缓存
        this.chart.setOption(options, true)
      },
      deep: true
    }
  },
  mounted () {
    this.$echarts.registerTheme('tdTheme', tdTheme); // 覆盖默认主题
    this.initChart();
  },
  beforeDestroy () {
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
      // 初始化echart
      this.chart = this.$echarts.init(this.$el,"tdTheme")
      this.chart.setOption(this.options, true)
    }
  }
}
</script>

<style>
</style> -->
<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'echart',
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '2.5rem'
    },
    options: {
      type: Object,
      default: ()=>({})
    }
  },
  data () {
    return {
      chart: null
    }
  },
  computed: {
    ...mapState(['theme'])
  },
  watch: {
    options: {
      handler (options) {
        // 设置true清空echart缓存
        this.chart.setOption(options, true);
      },
      deep: true
    },
    theme: {
      handler (newTheme) {
        this.initChart(newTheme); // 当主题变化时重新初始化图表
      }
    }
  },
  mounted () {
    this.initChart(this.theme);
  },
  beforeDestroy () {
    if (this.chart) {
      this.chart.dispose();
    }
    this.chart = null;
  },
  methods: {
    async initChart (theme) {
      if (this.chart) {
        this.chart.dispose();
      }

      // 动态引入主题
      let tdTheme;
      switch (theme) {
        case 'shine':
          tdTheme = await import('./shine.json');
          break;
        case 'macarons':
          tdTheme = await import('./macarons.json');
          break;
        case 'infographic':
          tdTheme = await import('./infographic.json');
          break;
        case 'roma':
          tdTheme = await import('./roma.json');
          break;
        case 'wonderland':
          tdTheme = await import('./wonderland.json');
          break;
        case 'walden':
          tdTheme = await import('./walden.json');
          break;
        case 'essos':
          tdTheme = await import('./essos.json');
          break;
        default:
          tdTheme = await import('./theme.json');
      }

      this.$echarts.registerTheme('tdTheme', tdTheme.default);
      this.chart = this.$echarts.init(this.$el, "tdTheme");
      this.chart.setOption(this.options, true);
    }
  }
}
</script>

<style>
</style>
