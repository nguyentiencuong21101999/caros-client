const { createProxyMiddleware } = require('http-proxy-middleware');
let local ="http://localhost:4000"
let host = "https://messengers-server.herokuapp.com"
module.exports = function(app) {
  //Register
  app.use(
    "/user/register",
    createProxyMiddleware({
      //target: 'http://locallocal:4000',
      target: host,
      changeOrigin: true,
    })
  );
  //Login
  app.use(
    "/user/login",
    createProxyMiddleware({
      //target: 'http://locallocal:4000',
      target: host,
      changeOrigin: true,
    })
  );
  //listUser
  app.use(
    "/user/listUser",
    createProxyMiddleware({
      //target: 'http://locallocal:4000',
      target: host,
      changeOrigin: true,
    })
  );
  app.use(
    "/user/getUserByFullname",
    createProxyMiddleware({
      //target: 'http://locallocal:4000',
      target: host,
      changeOrigin: true,
    })
  );
};