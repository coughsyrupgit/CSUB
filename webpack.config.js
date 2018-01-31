const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './app/index.js',
        config: './app/config.js'
    },
    //devtool: 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'CS Useful Bookmarks',
            filename: 'index.html',
            chunks: ['app']
        }),
        new HtmlWebpackPlugin({
            title: 'CS Useful Bookmarks Configuration',
            filename: 'configure.html',
            chunks: ['config']
        })
    ],
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
            },
            {
                test: /\.json$/,
                use: [
                    'file-loader?name=[path][name].[ext]&context=./app/static'
                ]
            }
        ]
    }
}
