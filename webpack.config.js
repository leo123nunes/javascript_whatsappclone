const path = require('path')
const nodeMode = process.env.NODE_ENV == "production"
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: "./src/index.js",
    devServer: {
        contentBase: './dist',
        port: 8080
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "app.js"
    },
    optimization: {
        minimizer: [
            new UglifyWebpackPlugin({
                parallel: true,
                cache: true
            }),
            new OptimizeCssAssetsWebpackPlugin({})
        ]
    },
    plugins:[
            new MiniCssExtractPlugin({
                filename: "style.css"
            }),
            new CopyWebpackPlugin({
                patterns: [
                    { context: 'src/', from: '**/*.html'}
                ]
            })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }
        ]
    },
    mode: nodeMode ? "production" : "development"
}