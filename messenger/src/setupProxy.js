const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    console.log("a");
  app.use(
    "/messsenger",
    createProxyMiddleware({
      target: 'http://localhost:4000 ',
       //target: 'https://messenger-sever.herokuapp.com ',
      changeOrigin: true,
    })
  );
  app.use(
    "/user/register",
    createProxyMiddleware({
      //target: 'http://localhost:4000',
      target: 'https://messengers-server.herokuapp.com',
      changeOrigin: true,
    })
  );
  app.use(
    "/user/login",
    createProxyMiddleware({
      //target: 'http://localhost:4000',
      target: 'https://messengers-server.herokuapp.com',
      changeOrigin: true,
    })
  );
};