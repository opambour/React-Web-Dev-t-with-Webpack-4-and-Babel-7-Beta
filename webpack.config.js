const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

// const serverSideConfig = {
//     target: 'node',
//     // target: "webworker", // WebWorker
//     // target: "node", // Node.js via require
//     // target: "async-node", // Node.js via fs and vm
//     // target: "node-webkit", // nw.js
//     // target: "electron-main", // electron, main process
//     // target: "electron-renderer", // electron, renderer process
//     mode: 'production',
//     devtool: 'source-map',
//     resolve: {
//         // Add `.ts` and `.tsx` as a resolvable extension.
//         extensions: ['.tsx', '.ts', '.js']
//     },
//     watch: true,
//     watchOptions: {
//         aggregateTimeout: 300,
//         poll: 1000, // refresh and watch every second
//         ignored: /node_modules/
//     },
//     entry: {

//     },
//     output: {
//         filename: '[name].build.js',
//         path: path.resolve(__dirname, '/dist')
//     },
//     module: {
//         rules: {
//             // es6 rules
//         }
//     }
// };

const clientSideseConfig = {
    target: 'web',
    // mode: 'production',
    devtool: 'source-map',
    resolve: {
        // Add `'.jsx', '.js' and '.es6' as a resolvable extension.
        extensions: ['.jsx', '.js', '.es6']
    },
    watch: true, // Watch the filesystem for changes
    watchOptions: { // The polling interval for watching (also enable polling)
        aggregateTimeout: 300,
        poll: 1000, // refresh and watch every second
        ignored: /node_modules/
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        watchContentBase: true,
        watchOptions: {
            poll: true
        },
        hot: true,
        port: 9000,
        index: 'index.html'
    },
    entry: {
        'client_side/app': './src/client_side/app.js'
    },
    output: {
        filename: '[name].build.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            // eslint
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'eslint-loader',
            },
            // es6 rules
            {
                test: /\.(jsx|js)$/,
                use: [
                    'cache-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-flow', '@babel/preset-react'],
                            plugins: [
                                '@babel/plugin-transform-runtime',
                                require('@babel/plugin-proposal-object-rest-spread')
                            ],
                            cacheDirectory: true
                        }
                    }
                ],
                exclude: /(node_modules|bower_components)/,
            }
        ]
    },
    plugins: [
        // A webpack plugin to remove/clean your build folder(s) before building
        // new CleanWebpackPlugin(['dist'], {
        //     // options
        //     verbose: true,
        //     dry: false
        // }),
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify('production')
        // }),
        // /**  HMR allows all kinds of modules to be updated at runtime without the need for a full refresh.
        //  * HMR is not intended for use in production.
        //  */
        new webpack.HotModuleReplacementPlugin({
            // Options...
            title: 'Dev: Hot Module Replacement...'
        }),
        // The HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles.
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html'
        })
    ]
};

module.exports = clientSideseConfig;

// multiple targets and configuration
// module.exports = [serverSideConfig, clientSideseConfig]