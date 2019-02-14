const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/', { target: 'https://api-neto.herokuapp.com/bosa-noga/' }));
};