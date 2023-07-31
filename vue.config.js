const path = require('path')

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@mock', path.join(__dirname, 'mock'))
  },
  pages: {
    popup: {
      template: 'public/browser-extension.html',
      entry: './src/popup/main.js',
      title: 'Popup'
    }
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: 'src/background.js'
        },
        contentScripts: {
          entries: {
            'content-script': [
              'src/content-scripts/index.js'
            ]
          }
        }
      }
    }
  }
}
