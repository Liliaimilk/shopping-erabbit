const path = require('path')
module.exports = {
  transpileDependencies: true,

  // 安装style-resources-loader
  // 将全部的less文件自动注入到style中
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname, './src/assets/style/variables.less'),
        path.join(__dirname, './src/assets/style/mixins.less')
      ]
    }
  },

  // chainWebpack: config => {
  // config.module
  //   .rule('images')
  //   .use('url-loader')
  //   .loader('url-loader')
  //   .tap(options => Object.assign(options, { limit: 1 }))


  // },
  devServer: {
    // open: true,
    // host: 'www.corho.com',
    // port: 8080,
    // 这个是给webpack-dev-server开启可IP和域名访问权限。
    historyApiFallback: true,
    allowedHosts: "all"
  },

  configureWebpack: {
    externals: {
      qc: 'QC'
    }
  },

}
