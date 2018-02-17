const merge = require('webpack-merge'),
webpack = require('webpack'),
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
        })
    ]
})