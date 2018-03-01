const merge = require('webpack-merge'),
webpack = require('webpack'),
path = require('path'),
HTMLWebpackPlugin = require('html-webpack-plugin'),
UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
ExtractTextPlugin = require('extract-text-webpack-plugin'),
common = require('./webpack.common');

module.exports = merge(common, {
    entry: {
        main: ['babel-polyfill', './src/index.js'],
        vendor: ['react', 'react-dom']
    },
    output: {
        filename: './js/[name].min.js',
        path: path.join(__dirname, 'dist'),
        chunkFilename: './js/[name].chunk.min.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }
            },
            {
                test: /\.(jpe?g|gif|png)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 10,
                            fallback: 'file-loader',
                            name: 'images/[name]_[hash].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            webp: {
                                quality: 70 
                            }
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: {
                    loader: 'svg-url-loader',
                    options: {
                        limit: 10 * 1024,
                        noquotes: true,
                        iesafe: true,
                        name: './assets/img/[name]_[hash].[ext]'
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
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: loader => [
                                    require('autoprefixer')({
                                        browsers: [
                                            'last 2 versions',
                                            '> 0.5%'
                                        ]
                                    })
                                ]
                            }
                        }
                    ]                    
                })
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            title: 'React App',
            inject: 'body',
            minify: false
        }),
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
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ExtractTextPlugin({
            filename: './css/style.min.css',
            ignoreOrder: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }) 
    ]
})
