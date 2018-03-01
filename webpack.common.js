const path = require('path'),
HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js'    
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env', 'babel-preset-stage-2', 'babel-preset-react']
                    }
                }
            },
            {
                test: /\.(mp(3|4)|flac|webm|avi|ogg|mkv)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: './assets/[path][name].[ext]'
                    }
                }
            }                        
        ]
    } 
}
