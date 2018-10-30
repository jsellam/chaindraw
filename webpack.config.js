const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
   entry: './src/script/app.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
   },
   module: {
      rules: [
        {
            test: /\.js$/,
            include: path.resolve(__dirname,'src'),
            exclude: /(node_modules|dist|sample)/,
            use: {
                loader: 'babel-loader',
            },
        },
        
        {
            test: /\.scss$/,
            use: [
                process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS
            ]
        }
    ],
   },

   plugins: [
    new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
    }),
    new CopyWebpackPlugin([{ from: 'static/**/*', to: './'},{ from: 'index.html', to: './'}])
]

};