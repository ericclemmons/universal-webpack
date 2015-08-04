var base = require("./webpack.config.base");
var path = require("path");
var webpack = require("webpack");

module.exports = base.merge({
  entry: {
    test: ["./test/support/all.js"],
  },
  externals: /^[a-z\-0-9]+$/,  // Every non-relative module is external
  node: {
    __filename: true,
    __dirname: true,
  },
  output: {
    libraryTarget: "umd",
    path: path.join(__dirname, "test"),
  },
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __SERVER__: true,
      __STAGE__: JSON.stringify("test"),
    }),
  ],
  target: "node",
});
