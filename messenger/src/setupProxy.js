const { createProxyMiddleware } = require('http-proxy-middleware');
let url_local ="http://localhost:4000"
let url_host = "https://messengers-server.herokuapp.com"
module.exports = function(app) {
  //Register
  app.use(
    "/user/register",
    createProxyMiddleware({
      //target: 'http://locallocal:4000',
      target: url_host,
      changeOrigin: true,
    })
  );
  //Login
  app.use(
    "/user/login",
    createProxyMiddleware({
      //target: 'http://locallocal:4000',
      target: url_host,
      changeOrigin: true,
    })
  );
  //listUser
  app.use(
    "/user/listUser",
    createProxyMiddleware({
      //target: 'http://locallocal:4000',
      target: url_host,
      changeOrigin: true,
    })
  );
  app.use(
    "/user/getUserByFullname",
    createProxyMiddleware({
      //target: 'http://locallocal:4000',
      target: url_host,
      changeOrigin: true,
    })
  );
  app.use(
    "/user/addFriend",
    createProxyMiddleware({
      //target: 'http://locallocal:4000',
      target: url_host,
      changeOrigin: true,
    })
  );
  app.use(
    "/user/getAccept",
    createProxyMiddleware({
      //target: 'http://locallocal:4000',
      target: url_host,
      changeOrigin: true,
    })
  );
  app.use(
    "/user/getFriend",
    createProxyMiddleware({
      //target: 'http://locallocal:4000',
      target: url_host,
      changeOrigin: true,
    })
  );
  app.use(
    "/user/acceptFriend",
    createProxyMiddleware({
      //target: 'http://locallocal:4000',
      target: url_host,
      changeOrigin: true,
    })
  );

  app.use(
    "/user/checkAddFriend",
    createProxyMiddleware({
      //target: 'http://locallocal:4000',
      target: url_host,
      changeOrigin: true,
    })
  );
};