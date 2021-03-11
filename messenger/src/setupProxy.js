const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    console.log("a");
  app.use(
    "/test",
    createProxyMiddleware({
      //target: 'http://localhost:4000 ',
       target: 'https://messenger-sever.herokuapp.com ',
      changeOrigin: true,
    })
  );
  app.use(
    "/test2",
    createProxyMiddleware({
      //target: 'http://localhost:4000 ',
      target: 'https://messenger-sever.herokuapp.com ',
      changeOrigin: true,
    })
  );
};