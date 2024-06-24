const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  chainWebpack: config => {
    config.resolve.alias
      .set('_c', resolve('src/components')) // key,value自行定义，比如.set('@@', resolve('src/components'))
  },
  devServer: {
    proxy: {
      //设置允许跨域的路径(以api为例)
      '/api-region': {
        //设置允许跨域请求的域名(以我请求的api域名为例)
        target: 'https://uapis.cn/api/myip.php',
        secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true,
      },

      //设置允许跨域的路径(以api为例)
      '/dev': {
        //设置允许跨域请求的域名(以我请求的api域名为例)
        target: 'https://devapi.qweather.com/',
        secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      //设置允许跨域的路径(以api为例)
      '/weather': {
        //设置允许跨域请求的域名(以我请求的api域名为例)
        target: 'https://api.qweather.com/',
        secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
  }
}