module.exports = {
  configureWebpack: {
    resolve: {
      // 设置路径别名，项目重启生效
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views',
        'network': '@/network',
        'utils': '@/utils'
      }
    },
    // 项目build完成后输出到当前目录下 默认配置
    // publicPath: './'
  }
}