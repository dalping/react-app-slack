const prod = process.env.NODE_ENV === "production";
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: prod ? "production" : "development",
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname + "/dist/"),
    filename: "app.js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: [".ts", ".tsx", ".js", ".json"],
        },
        use: "ts-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  devtool: prod ? undefined : "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin(),
  ],

  devServer: {
    port: 3000,
    historyApiFallback: true, // react router
    devMiddleware: { publicPath: "/dist" },
    static: { directory: path.resolve(__dirname, "public") },
    hot: true,
    proxy: {
      "/api/": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
};
