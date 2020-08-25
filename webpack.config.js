//_dirname:代表当前所在目录的绝对路径 
const path = require('path') //解析路径相关模块
const HtmlWebpackPlugin = require('html-webpack-plugin')

/* 
ES6:export default import
CommonJS:module.exports / exports / require
*/

module.exports = {
    // 模式: 生产环境
    mode: 'production',
    // 入口
    entry: {
    app: path.resolve(__dirname, 'src/index.js')
    },
    // 出口(打包生成js)
    output: {
    filename: 'static/js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
    },
    // 模块加载器 打包css等
    module: {
    rules: [
        //处理css
        {
            test: /\.css$/,
            use: ['style-loader','css-loader']
          },
          //处理es6==>es5
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/, //exclude排除
            // includes:[path.resolve(__dirname,"src")],//includes:[]包裹只针对哪些处理
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'] //预设包包含多个常用插件的大包preset
              }
            }
          },
          //处理图片
          {
            test:  /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                  name: 'static/img/[name].[hash:7].[ext]' // 相对于output.path
                }
              }
            ]
          }
    ]
    },
    // 插件 打包html
    plugins: [
    new HtmlWebpackPlugin({
        template: 'index.html', //将哪个页面作为模板页面处理，在根目录找
        filename: 'index.html'  //生成页面(output指定path下)
    })
    ],
    //开发服务器的配置 
    devServer: {
        open: true, // 自动打开浏览器
        quiet: true, // 不做太多日志输出
      },

      devtool:"cheap-module-eval-source-map",
    }