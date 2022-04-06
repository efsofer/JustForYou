// /*
//  * API proxy configuration.
//  * This allows you to proxy HTTP request like `http.get('/api/stuff')` to another server/port.
//  * This is especially useful during app development to avoid CORS issues while running a local server.
//  * For more details and options, see https://angular.io/guide/build#using-corporate-proxy
//  */

const PROXY_CONFIG = {
  '/vc-api': {
    'target': 'https://ws.valuecard.co.il/pos/V5/Default.asmx',
    'secure': false,
    'pathRewrite': {
      '^/vc-api': ''
    },
    'changeOrigin': true,
    'logLevel': 'info'
  },
  '/Api': {
    'target': 'https://www.just4u.co.il/Api',
    'secure': false,
    'pathRewrite': {
      '^/Api': ''
    },
    'changeOrigin': true,
    'logLevel': 'info'
  },
  '/sb-api': {
    'target': 'http://admin.shookbook.co.il/remote',
    'secure': false,
    'pathRewrite': {
      '^/sb-api': ''
    },
    'changeOrigin': true,
    'logLevel': 'info'
  },
  '/ca-api': {
    'target': 'https://www.just4u.co.il/ca-api',
    'secure': false,
    'pathRewrite': {
      '^/ca-api': ''
    },
    'changeOrigin': true,
    'logLevel': 'info'
  }
};

module.exports = PROXY_CONFIG;
