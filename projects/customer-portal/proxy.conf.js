// /*
//  * API proxy configuration.
//  * This allows you to proxy HTTP request like `http.get('/api/stuff')` to another server/port.
//  * This is especially useful during app development to avoid CORS issues while running a local server.
//  * For more details and options, see https://angular.io/guide/build#using-corporate-proxy
//  */

const PROXY_CONFIG = {
  '/Api': {
    'target': 'https://www.just4u.co.il/Api',
    // 'target': 'https://test.justforu.co.il/API',
    'secure': false,
    'pathRewrite': {
      '^/Api': ''
    },
    'changeOrigin': true,
    'logLevel': 'info'
  }
};

module.exports = PROXY_CONFIG;
