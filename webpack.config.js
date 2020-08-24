const path = require("path"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  WorkboxPlugin = require("workbox-webpack-plugin"),
  CopyPlugin = require("copy-webpack-plugin"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  webpack = require("webpack"),
  dotenv = require("dotenv");

module.exports = () => {
  const env = dotenv.config().parsed;

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
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
          exclude: /node_modules,serviceworker/,
          loader: "babel-loader",
        },
        {
          test: /\.ico$/,
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
          },
        },
        {
          test: /\.(png|jpe?g|svg|gif)$/,
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "images",
            publicPath: "/images",
          },
        },
        {
          test: /\.(css|sass|scss)$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
      ],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: "styles.css",
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html"),
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, "public"),
            to: path.join(__dirname, "dist"),
          },
        ],
      }),
      new webpack.DefinePlugin(envKeys),
      new WorkboxPlugin.InjectManifest({
        swDest: "serviceworker.js",
        swSrc: "./serviceworker.js",
      }),
    ],

    // devtool: "inline-source-map",
  };
};
