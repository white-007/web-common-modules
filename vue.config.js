const path = require('path')

module.exports = {
  // runtimeCompiler: true,
  productionSourceMap: false,
  /*   devServer: {
    proxy: {
      '/api': {
        target: 'http://172.16.1.141:11001/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        } 
      }
    }
  }, */
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : 'cheap-module-source-map',
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
        scss: path.join(__dirname, 'src/common/scss'),
        assets: path.join(__dirname, 'src/assets')
      }
    }
  }
}
