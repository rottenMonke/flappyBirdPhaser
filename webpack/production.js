const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: path.resolve(__dirname, "../src/index.js"),
    },
    output: {
        filename: 'main[fullhash].js',
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/"
    },
    optimization: {
        minimize: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader"
                }
              },
              {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
        
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'flappyBirdPhaser',
            template: path.resolve(__dirname, "../src/index.html"),
            cache: false
          })
    ],
    resolve: {
        extensions: ['.js', '.css']
    },
};