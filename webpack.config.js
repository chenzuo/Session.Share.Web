const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //打包html的插件
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: {
        './js/index': './js/index.js' //入口文件
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        //path: __dirname + '/dist', //output.path 的默认值是 ./dist　path:对应一个绝对路径，此路径是希望一次性打包的目录
        //修改为hash模式
        filename: '[name].[chunkhash:5].js' //能指定出口文件中同样的filename名称　filename:编译文件的文件名，首选推荐：main.js||bundle.js||index.js
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // you can specify a publicPath here
                        // by default it use publicPath in webpackOptions.output
                        publicPath: '../'
                    }
                },
                "css-loader"
            ]
        }]
    },
    //插件
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html', //根据自己的指定的模板文件来生成特定的 html 文件。这里的模板类型可以是任意你喜欢的模板，可以是 html, jade, ejs, hbs, 等等，但是要注意的是，使用自定义的模板文件时，需要提前安装对应的 loader， 否则webpack不能正确解析
            filename: 'index.html', // 默认情况下生成的 html 文件叫 index.html
            minify: {
                collapseWhitespace: true, //把生成的 index.html 文件的内容的没用空格去掉，减少空间
            },
            hash: true, //为了更好的 cache，可以在文件名后加个 hash。
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].[chunkhash:5].css",
            chunkFilename: "[id].css"
        })
    ]
};