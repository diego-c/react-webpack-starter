const merge = require('webpack-merge'),
ExtractTextPlugin = require('extract-text-webpack-plugin'),
webpack = require('webpack'),
HTMLWebpackPlugin = require('html-webpack-plugin'),
path = require('path'),
common = require('./webpack.common');

module.exports = merge(common, {
    entry: {
        main: path.resolve(__dirname, '../src', 'index.js')   
    },
    devtool: 'cheap-module-eval-source-map',
    output: {
        filename: './js/[name].js',
        path: path.join(__dirname, 'dist'),
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json',
        chunkFilename: './js/[name].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: './assets/img/[name].[ext]'
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
                }))
            }           
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        compress: true,
        port: 1337,
        historyApiFallback: true
    },   
    plugins: [
        new HTMLWebpackPlugin({
            template: path.join(__dirname, '../src', 'index.html'),
            title: 'React App (Development)',
            inject: 'body',
            minify: false
        }),
        new ExtractTextPlugin({
            filename: './css/main.css',
            ignoreOrder: true
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }) 
    ]
})