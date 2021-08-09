module.exports = {
  publicPath: "/",
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // mutate config for production...
      config.devtool = "";
    } else {
      // mutate for development...
      config.devtool = "source-map";
    }
  },
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          includePaths: ["./node_modules"]
        }
      }
    }
  }
};
