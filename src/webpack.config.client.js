var base = require("./webpack.config.base");
var path = require("path");
var SplitByPathPlugin = require("webpack-split-by-path");
var webpack = require("webpack");

module.exports = base.merge({
  devtool: base.debug ? "#eval-source-map" : null,
  entry: {
    "client": [
      path.join(__dirname, "src/client"),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __STAGE__: JSON.stringify(base.defaults.env),
      "process.env.NODE_ENV": JSON.stringify(base.defaults.debug ? "development" : "production"),
    }),
    new SplitByPathPlugin([
      {
        name: "vendor",
        path: path.join(__dirname, "node_modules"),
      },
    ]),
  ].concat(base.defaults.debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ]),
});
