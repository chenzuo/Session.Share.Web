var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //打包html的插件
var cleanwebpackplugin = require('clean-webpack-plugin'); //清理打包目录
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: {
        'index': './src/js/index.js' //入口文件
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                },
                "css-loader"
            ]
        }, {
            test: /\.(jpg|png|gif)$/,
            use: [{
                loader: "url-loader",
                options: {
                    limit: 50,
                    outputPath: "images"
                }
            }]
        }]
    },
    output: {
        //__dirname 当前webpack.config.js的路径
        filename: 'js/[name].[chunkHash:5].js', //打包后index.js的名字，
        path: path.resolve(__dirname, 'dist')
    },
    //插件
    plugins: [
        new cleanwebpackplugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            hash: true, //为了更好的 cache，可以在文件名后加个 hash。
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[chunkHash:5].css"
        })
    ]
};