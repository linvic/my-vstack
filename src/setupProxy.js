
// https://github.com/facebook/create-react-app/blob/main/docusaurus/docs/proxying-api-requests-in-development.md

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/dapp/api/v1',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
    })
  );
};