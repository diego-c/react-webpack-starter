const merge = require('webpack-merge'),
webpack = require('webpack'),
path = require('path'),
HTMLWebpackPlugin = require('html-webpack-plugin'),
UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
ExtractTextPlugin = require('extract-text-webpack-plugin'),
ManifestPlugin = require('inline-chunk-manifest-html-webpack-plugin'),
ChunkHash = require('webpack-chunk-hash'),
OfflinePlugin = require('offline-plugin'),
PWAManifest = require('webpack-pwa-manifest'),
common = require('./webpack.common');

module.exports = merge(common, {
    entry: {
        main: ['babel-polyfill', path.resolve(__dirname, '../src', 'index.js')],
        vendor: ['react', 'react-dom', 'offline-plugin/runtime']
    },
    output: {
        filename: './js/[name].[chunkhash].min.js',
        path: path.join(__dirname, '../dist'),
        chunkFilename: './js/[name].[chunkhash].chunk.min.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(jpe?g|gif|png)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 10,
                            fallback: 'file-loader',
                            name: 'images/[name].[hash].[ext]'
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
                        name: './assets/img/[name].[hash].[ext]'
                    }
                }
            },
            {
                test: /\.css$/,
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
        new webpack.optimize.ModuleConcatenationPlugin(),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            title: 'React App'
        }),
        new PWAManifest({
            name: 'React App',
            short_name: 'ReactApp',
            description: 'Production ready React PWA',
            theme_color: '#47b9f7',
            background_color: '#ffffff',
            orientation: 'portrait',
            icons: [
                {
                    src: path.resolve(__dirname, '../src/react-logo.svg'),
                    sizes: [96, 128, 192, 256, 384, 512],
                    destination: './icons'
                }
            ] 
        }),
        new ManifestPlugin({
            dropAsset: true
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
        new OfflinePlugin({
            AppCache: false,
            ServiceWorker: { events: true },
            caches: 'all'
        }),
        new ExtractTextPlugin({
            filename: './css/style.[chunkhash].min.css',
            allChunks: true
        }),
        new webpack.HashedModuleIdsPlugin(),
        new ChunkHash(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }) 
    ]
})
