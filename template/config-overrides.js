const { fixBabelImports, override } = require("customize-cra");

module.exports = override(
  fixBabelImports("@material-ui/core", {
    libraryDirectory: "esm",
    camel2DashComponentName: false,
  }),

  fixBabelImports("@material-ui/icons", {
    libraryDirectory: "esm",
    camel2DashComponentName: false,
  })
);
