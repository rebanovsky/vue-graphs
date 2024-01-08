const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  configureWebpack: {
    entry: "./src/index.js",
    output: {
      filename: "vue-graphs.js",
      libraryTarget: "umd",
      library: "VueGraphs",
      umdNamedDefine: true,
    },
    externals: {
      vue: "Vue",
    },
  },
  filenameHashing: false,
  chainWebpack: (config) => {
    config.optimization.delete("splitChunks");
    config.plugins.delete("html");
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");
  },
  css: {
    extract: true,
  },
});
