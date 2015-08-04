var base = require("./webpack.config.base");
var path = require("path");
var webpack = require("webpack");

module.exports = base.merge({
  entry: {
    server: [
      path.join(__dirname, "src/server.js"),
    ],
  },
  externals: /^[a-z\-0-9]+$/,  // Every non-relative module is external
  node: {
    __filename: true,
    __dirname: true,
  },
  output: {
    libraryTarget: "commonjs2",
    path: path.join(__dirname, "src"),
  },
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __SERVER__: true,
      __STAGE__: "process.env.NODE_ENV || \"development\"",
   }),
  ],
  target: "node",
});
