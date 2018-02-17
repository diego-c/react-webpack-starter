const merge = require('webpack-merge'),
webpack = require('webpack'),
ExtractTextPlugin = require('extract-text-webpack-plugin'),
path = require('path'),
common = require('./webpack.common');

module.exports = merge(common, {
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[name]__[local]__[hash:base64:5]'
                            }
                        }
                    ]
                }))
            }           
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 1337
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[name].js.map'
        }),
        new ExtractTextPlugin({
            filename: './css/style.css',
            ignoreOrder: true
        }) 
    ]
})