const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    console.log("a");
  app.use(
    "/test",
    createProxyMiddleware({
      target: 'http://localhost:4000 ',
      changeOrigin: true,
    })
  );
};