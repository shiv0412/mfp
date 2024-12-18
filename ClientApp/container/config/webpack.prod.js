const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { merge } = require("webpack-merge");

const packageJson = require("../package.json");
const commonConfig = require("./webpack.common");

const domain = process.env.PRODUCTION_DOMAIN;
const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        ideate: `ideate@${domain}/ideate/remoteEntry.js`,
        homepage: `homepage@${domain}/ideate/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
