const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    console.log("a");
  app.use(
    "/test",
    createProxyMiddleware({
      target: 'https://messenger-sever.herokuapp.com ',
      changeOrigin: true,
    })
  );
};