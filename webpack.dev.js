/**
 * webpack
 */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * others
 */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: 'development',
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor_ng.ts', // 第三方依赖，如Angular、lodash和bootstrap.cs
        'app': './src/main.ts'
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.js']  // 自动补全识别后缀
    },
    devServer: {
        contentBase: './',
        hot: true,
        compress: true,
        inline: true,
        port: 8001
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.html$/,
                use: [ {
                    loader: 'html-loader',
                    options: {
                        minimize: false
                    }
                }],
            },
            {
                test: /\.css$/,
                loader: ['css-loader' ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerHost: '127.0.0.1',
            analyzerPort: 8889,
            reportFilename: 'report.html',
            defaultSizes: 'parsed',
            openAnalyzer: false,
            generateStatsFile: false,
            statsFilename: 'stats.json',
            statsOptions: null,
            logLevel: 'info'
        }),
        /**
         * 
        WARNING in ./node_modules/@angular/core/esm5/core.js
        6558:15-36 Critical dependency: the request of a dependency is an expression
        */
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core/,
            path.resolve(__dirname, '../src')
        )
    ],
    output: {
        path: path.resolve(__dirname, './'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    }
};