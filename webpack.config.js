var { resolve } = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 配置入口文件，有几个写几个
  entry: {
    index: './src/js/page/index.js',
    list: './src/js/page/list.js',
    about: './src/js/page/about.js'
  },
  output: {
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/[name].js',     // 每个页面对应的主js的生成配置
    chunkFilename: 'js/[id].chunk.js'   // chunk生成的配置
  },
  module: {
    rules: [    
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract(['style-loader', 'css-loader']),
            exclude: /node_modules/
          },

          {
            test: /\.less$/,
            use: ExtractTextPlugin.extract(['css-loader', 'less-loader']),
            exclude: /node_modules/
          },

          {
            test: /\.html$/,
            use: 'html-loader?attrs=img:src img:data-src',
            exclude: /node_modules/
          },

          {
            test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: 'file-loader?name=./fonts/[name].[ext]',
            exclude: /node_modules/
          },

          {
            test: /\.(png|jpg|gif)$/,
            use: 'url-loader?limit=8192&name=./img/[hash].[ext]',
            exclude: /node_modules/
          }
    ]
    
  },

  plugins: [
    new webpack.ProvidePlugin({ // 加载jq
      $: 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
      chunks: ['index', 'list', 'about'], // 提取哪些模块共有的部分
      minChunks: 3 // 提取至少3个模块共有的部分
    }),
    new ExtractTextPlugin('css/[name].css'), // 单独使用link标签加载css并设置路径，相对于output配置中的publickPath

    // HtmlWebpackPlugin，模板生成相关的配置，每个对于一个页面的配置，有几个写几个
    new HtmlWebpackPlugin({ // 根据模板插入css/js等生成最终HTML
      favicon: './src/img/favicon.ico', // favicon路径，通过webpack引入同时可以生成hash值
      filename: './index.html', // 生成的html存放路径，相对于path
      template: './src/view/index.html', // html模板路径
      inject: 'body', // js插入的位置，true/'head'/'body'/false
      hash: true, // 为静态资源生成hash值
      chunks: ['vendors', 'index'], // 需要引入的chunk，不配置就会引入所有页面的资源
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: false // 删除空白符与换行符
      }
    }),
    new HtmlWebpackPlugin({ // 根据模板插入css/js等生成最终HTML
      favicon: './src/img/favicon.ico', // favicon路径，通过webpack引入同时可以生成hash值
      filename: './list.html', // 生成的html存放路径，相对于path
      template: './src/view/list.html', // html模板路径
      inject: true, // js插入的位置，true/'head'/'body'/false
      hash: true, // 为静态资源生成hash值
      chunks: ['vendors', 'list'], // 需要引入的chunk，不配置就会引入所有页面的资源
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: false // 删除空白符与换行符
      }
    }),
    new HtmlWebpackPlugin({ // 根据模板插入css/js等生成最终HTML
      favicon: './src/img/favicon.ico', // favicon路径，通过webpack引入同时可以生成hash值
      filename: './about.html', // 生成的html存放路径，相对于path
      template: './src/view/about.html', // html模板路径
      inject: true, // js插入的位置，true/'head'/'body'/false
      hash: true, // 为静态资源生成hash值
      chunks: ['vendors', 'about'], // 需要引入的chunk，不配置就会引入所有页面的资源
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: false // 删除空白符与换行符
      }
    }),

    new webpack.HotModuleReplacementPlugin() // 热加载
  ],

  devServer: {
    host: 'localhost',
    port: 9090,
    inline: true,
    hot: true
  }
}
