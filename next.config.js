const withPlugins = require('next-compose-plugins');
const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");
const nextConfig = {
    distDir: '.next',
    pageExtensions: ['js'],
    target: 'serverless',
  };

module.exports = withPlugins([
    [withSass],
    [withCss]
  ], nextConfig);
