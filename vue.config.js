const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,

  // 安装style-resources-loader
  // 将全部的less文件注入到style中
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname, './src/assets/style/variables.less'),
        path.join(__dirname, './src/assets/style/mixins.less')
      ]
    }
  }
})
