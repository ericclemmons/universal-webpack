var _ = require("lodash");
var path = require("path");

var env = process.env.NODE_ENV || "development";

var debug = ["development", "test"].indexOf(env) !== -1;

var defaults = {
  cache: debug,
  debug: debug,
  devtool: debug ? "#inline-source-map" : null,
  entry: {},
  env: env,
  module: {
    loaders: [
      { test: /\.js$/, loaders: ["babel"], exclude: /node_modules/ },
      { test: /\.json$/, loaders: ["json"] },
    ],
  },
  output: {
    chunkFilename: "[name].min.js",
    devtoolModuleFilenameTemplate: "[absolute-resource-path]",
    filename: "[name].min.js",
    libraryTarget: "var",
    path: path.join(__dirname, "public"),
  },
  plugins: [],
  target: "web",
};

module.exports.defaults = defaults;

module.exports.extend = function merge(config) {
  return _.extend({}, defaults, config);
};

module.exports.merge = function merge(config) {
  return _.merge({}, defaults, config);
};
