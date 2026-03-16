/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://mohdismaeel.me",
  generateRobotsTxt: true,

  additionalPaths: async (config) => [
    await config.transform(config, "/"),
    await config.transform(config, "/blogs"),
    await config.transform(config, "/projects"),
    await config.transform(config, "/terminal"),
    await config.transform(config, "/geeksforgeek/problems"),
    await config.transform(config, "/leetcode/problems"),
  ],
};