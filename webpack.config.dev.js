const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const sassLoader = 'style!css!sass?sourceMap=true&sourceMapContents=true';

module.exports = {
  devtool: 'cheap-module-eval-source-map',//This option controls if and how source maps are generated.
  // enhance debugging by adding meta info for the browser devtools(通过为浏览器devtools添加元信息来增强调试功能)
  
  entry: {
    app: [
      'webpack-hot-middleware/client',
      './js/app.js'
    ],
    vendors: [
      'react',
      'react-dom',
      'react-router'
    ]
  },
  output: {
     // options related to how webpack emits results
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },

  module: {
    rules: [{
        test:/\.jsx?$/,//匹配.js和.jsx结尾的文件
        include: [
          path.resolve(__dirname, 'js')
        ],
        loaders: ['react-hot', 'babel']//Rule.loaders is an alias to Rule.use.
      }, {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, 'css')
        ],
        loader: sassLoader
      }

    ]
  },

  resolve: { 
    //Configure how modules are resolved.
    alias: {
      //Create aliases to import or require certain modules more easily. Eg: in app.js, "import React from '../node_modules/react';" can now be written as "import React from 'react"
      'react': path.join(__dirname,'node_modules','react')
    },
    extensions: [
      //Enables users to leave off the extension when importing.(省略引入文件的后缀)
      '', '.js', '.jsx','.scss','.css'
    ]
  },

  plugins: [
    webpack.NoErrorsPlugin(),
    webpack.HotModuleReplacementPlugin()
  ]
}