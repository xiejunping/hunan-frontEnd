const path = require('path')
const glob = require('glob')
const PAGE_PATH = 'examples'

const buildEnteries = (globs, pagePath) => {
  let pages = {}

  globs.forEach(filePath => {
    let fileName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'))
    pages[fileName] = {
      entry: `${pagePath}/${fileName}/${fileName}.js`,
      filename: `${fileName}.html`,
      favicon: 'public/favicon.ico',
      hash: true,
      chunks: ['chunk-vendors', 'chunk-common', fileName]
    }
  })
  return pages
}

module.exports = {
  pages: buildEnteries(glob.sync(`./${PAGE_PATH}/*/*.js`), PAGE_PATH),
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.mode = 'production';
    } else {
      config.mode = 'development';
    }
    Object.assign(config, {
      resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          '@': path.resolve(__dirname, './src'),
          'common': path.resolve(__dirname, './src/common'),
          'assets': path.resolve(__dirname, './src/assets')
        }
      }
    })
  },
  chainWebpack: config => {
    if (process.env.ANALYZ) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  }
}
