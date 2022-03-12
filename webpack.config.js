const path = require("path")
const htmlPlugin = require("html-webpack-plugin")
const cssExtractPlugin = require('mini-css-extract-plugin');
const cssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const imagesPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "bundle.min.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: 'images/[name][ext]'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [cssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          cssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  },
  plugins: [
    new htmlPlugin({ template: "src/index.html" }),
    new cssExtractPlugin({ filename: "styles.css" }),
    new CleanWebpackPlugin(),
    new cssMinimizerPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [
      "...",
      new imagesPlugin({
        minimizerOptions: {
          plugins: [
            ["gifsicle", { interlaced: true }],
            ["mozjpeg", { quality: 60 }],
            ["optipng", { optimizationLevel: 5 }],
            ['svgo']
          ],
        },
      }),
    ]
  }
}