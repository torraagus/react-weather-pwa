const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: "development",

  context: path.resolve(__dirname, "src"),

  entry: {
    app: "./index.js",
  },

  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },

  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    // new ServiceWorkerWebpackPlugin({
    //   entry: path.join(__dirname, "public", "serviceworker.js"),
    //   filename: "serviceworker.js",
    // }),
    new CopyPlugin({
      patterns: [
        // {
        //   from: path.join(__dirname, "public", "serviceworker.js"),
        //   to: path.join(__dirname, "dist"),
        // },
        // {
        //   from: path.join(__dirname, "public", "offline.html"),
        //   to: path.join(__dirname, "dist"),
        // },
        // {
        //   from: path.join(__dirname, "public", "manifest.json"),
        //   to: path.join(__dirname, "dist"),
        // },
        {
          from: path.join(__dirname, "public"),
          to: path.join(__dirname, "dist"),
        },
      ],
    }),
  ],

  devtool: "inline-source-map",
};
