const { createProxyMiddleware } = require('http-proxy-middleware');
let local ="http://localhost:4000"
let host = "https://messenger-sever.herokuapp.com"
module.exports = function(app) {
  app.use(
    "/messsenger",
    createProxyMiddleware({
      //target: 'http://localhost:4000 ',
       target: 'https://messenger-sever.herokuapp.com ',
      changeOrigin: true,
    })
  );
  //Register
  app.use(
    "/user/register",
    createProxyMiddleware({
      //target: 'http://localhost:4000',
      target: host,
      changeOrigin: true,
    })
  );
  //Login
  app.use(
    "/user/login",
    createProxyMiddleware({
      //target: 'http://localhost:4000',
      target: host,
      changeOrigin: true,
    })
  );
  //listUser
  app.use(
    "/user/listUser",
    createProxyMiddleware({
      //target: 'http://localhost:4000',
      target: host,
      changeOrigin: true,
    })
  );
};