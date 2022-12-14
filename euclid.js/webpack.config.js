const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const { webpack } = require("webpack");

module.exports = {
  mode: process.env.NODE_ENV === "prod" ? "production" : "development",
  entry: path.resolve(__dirname, "./src/index.js"),
  target: "web",
  cache: false,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/templates/index.html"),
      title: "euclid.js",
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
    }),
  ],
  devServer: {
    port: 3000,
    compress: true,
    hot: true,
    open: true,
  },
};
