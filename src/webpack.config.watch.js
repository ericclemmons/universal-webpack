var base = require("./webpack.config.base");
var client = require("./webpack.config.client");
var webpack = require("webpack");

// Clean config for modifying
var config = base.extend(client);

// All entry-points will trigger HMR
for (var name in config.entry) {
  var entry = config.entry[name];

  entry.unshift(
    "webpack-dev-server/client?http://localhost:8080",
    "webpack/hot/only-dev-server"
  );
}

// Add "react-hot" to all loaders that support .js files
config.module.loaders.forEach(function(loader) {
  if (loader.test.test("is.js")) {
    loader.loaders.unshift("react-hot");
  }
});

// Output goes through the WebpackDevServer
config.output.hotUpdateChunkFilename = "update/[hash]/[id].update.js";
config.output.hotUpdateMainFilename = "update/[hash]/update.json";
config.output.publicPath = "http://localhost:8080/";

config.plugins.unshift(
  // Wrap builds with HMR
  new webpack.HotModuleReplacementPlugin(),

  // Prevent errors from causing a reload
  new webpack.NoErrorsPlugin()
);

module.exports = config;
