const merge = require('webpack-merge'),
webpack = require('webpack'),
UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
CompressionPlugin = require('compression-webpack-plugin'),
ExtractTextPlugin = require('extract-text-webpack-plugin'),
common = require('./webpack.common');

module.exports = merge(common, {
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024
                    }
                }
            },
            {
                test: /\.svg$/,
                use: {
                    loader: 'svg-url-loader',
                    options: {
                        limit: 10 * 1024,
                        noquotes: true
                    }
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: {
                    loader: 'image-webpack-loader',
                    options: {
                        enforce: 'pre'
                    }
                }
                
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                minimize: true,
                                localIdentName: '[name]__[local]__[hash:base64:5]'
                            }
                        }
                    ]                    
                })
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin({
            test: /\.js$/,
            cache: true,
            parallel: true,
            sourceMap: true,
            uglifyOptions: {                
                ecma: 8,
                ie8: true,
                safari10: true
            }            
        }),
        new CompressionPlugin({
            cache: true,
            deleteOriginalAssets: true
        }),
        new webpack.DefinePlugin({
            'proccess.env.NODE_ENV': JSON.stringify('production')
        }),
        new ExtractTextPlugin({
            filename: 'css/style.min.css',
            ignoreOrder: true
        }) 
    ]
})