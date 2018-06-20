const withLess = require('@zeit/next-less');

const config = {
    distDir: 'build',
    assetPrefix: '',
    // Disabling file-system routing
    useFileSystemPublicRoutes: true
    // webpack(config) {
    //     config.module.rules.push({
    //         test: /\.css$/,
    //         loader: ['style-loader', 'css-loader']
    //     });
    //     config.module.rules.push({
    //         test: /\.js$/,
    //         loader: 'babel-loader',
    //         query: {
    //             presets: ['es2015']
    //         }
    //     });
    //     return config;
    // }
};

module.exports = Object.assign({}, config, withLess());
