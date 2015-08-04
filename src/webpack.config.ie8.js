var base = require("./webpack.config.base");
var path = require("path");
var SplitByPathPlugin = require("webpack-split-by-path");
var webpack = require("webpack");

module.exports = base.merge({
  devtool: null,
  entry: {
    "ie8": [
      path.join(__dirname, "src/compat/ie8"),
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": "production",
    }),
  ].concat(base.defaults.debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ]),
});
