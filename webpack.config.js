const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './app/index.js'/*,
        configure: './app/configure.js'*/
    },
    devtool: 'inline-source-map',
    /*plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'CoughSyrup Useful Bookmarks',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Configure your Useful Bookmarks',
            filename: 'configure.html'
        })
    ],*/
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            }
            /*{
                test: /\.json$/,
                use: [
                    'file-loader?name=[path][name].[ext]&context=./app/static'
                ]
            }*/
        ]
    }
}
