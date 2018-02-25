const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src/app');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist/js');

module.exports = {
    entry: {
        app: path.resolve(APP_PATH, 'app.jsx'),
        moment: ['moment']
    },
    devtool: 'cheap-module-source-map',
    output: {
        path: BUILD_PATH,
        publicPath: '../js/',
        filename: '[name].[chunkhash:6].bundle.js',
        chunkFilename: '[name].[chunkhash:6].bundle.js',
        sourceMapFilename: '[name].map'
    },
    plugins: [
        // 清空 dist 文件夹
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin('css/xdbin.style.css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest' // 用于提取manifest
        }),
        // html 模板
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: path.resolve(ROOT_PATH, 'index.tpl.prod.html')
        }),
        // 保证出错时，页面不阻塞；且会在编译结束后报错
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true,
                warnings: false,
                drop_console: true
            },
            comments: false
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx$/,
                use: ['babel-loader'],
                include: APP_PATH
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|mp3|ogg)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000
                    }
                }
            },
            // 解决 UglifyJs 不支持 ES6 语法的问题
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
