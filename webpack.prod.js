const path = require('path');
const Merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CommonConfig = require('./webpack.common.js');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src/app');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist/js');

module.exports = Merge(CommonConfig, {
    entry: {
        app: path.resolve(APP_PATH, 'app.jsx'),
        moment: ['moment']
    },
    devtool: 'cheap-module-source-map',
    output: {
        path: BUILD_PATH,
        publicPath: '/js/'
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: path.resolve(ROOT_PATH, 'index.tpl.prod.html')
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
    ]
});
