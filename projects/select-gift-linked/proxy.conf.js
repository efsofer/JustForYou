// const HttpsProxyAgent = require('https-proxy-agent');
//
// /*
//  * API proxy configuration.
//  * This allows you to proxy HTTP request like `http.get('/api/stuff')` to another server/port.
//  * This is especially useful during app development to avoid CORS issues while running a local server.
//  * For more details and options, see https://angular.io/guide/build#using-corporate-proxy
//  */
// const proxyConfig = [
//   {
//     context: '/api',
//     pathRewrite: { '^/api': '' },
//     target: 'https://api.chucknorris.io',
//     changeOrigin: true,
//     secure: false
//   }
// ];
//
// /*
//  * Configures a corporate proxy agent for the API proxy if needed.
//  */
// function setupForCorporateProxy(proxyConfig) {
//   if (!Array.isArray(proxyConfig)) {
//     proxyConfig = [proxyConfig];
//   }
//
//   const proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
//   let agent = null;
//
//   if (proxyServer) {
//     console.log(`Using corporate proxy server: ${proxyServer}`);
//     agent = new HttpsProxyAgent(proxyServer);
//     proxyConfig.forEach(entry => { entry.agent = agent; });
//   }
//
//   return proxyConfig;
// }
//
// module.exports = setupForCorporateProxy(proxyConfig);


// 'use strict';
//
// const HttpsProxyAgent = require('https-proxy-agent');
//
// /*
//  * API proxy configuration.
//  * This allows you to proxy HTTP request like `http.get('/api/stuff')` to another server/port.
//  * This is especially useful during app development to avoid CORS issues while running a local server.
//  * For more details and options, see https://github.com/angular/angular-cli#proxy-to-backend
//  */
// const proxyConfig = [
//   {
//     context: '/api',
//     pathRewrite: { '^/api': '' },
//     target: 'https://api.chucknorris.io',
//     changeOrigin: true,
//     secure: false
//   }
// ];
//
// /*
//  * Configures a corporate proxy agent for the API proxy if needed.
//  */
// function setupForCorporateProxy(proxyConfig) {
//   if (!Array.isArray(proxyConfig)) {
//     proxyConfig = [proxyConfig];
//   }
//
//   const proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
//   let agent = null;
//
//   if (proxyServer) {
//     console.log(`Using corporate proxy server: ${proxyServer}`);
//     agent = new HttpsProxyAgent(proxyServer);
//     proxyConfig.forEach(entry => { entry.agent = agent; });
//   }
//
//   return proxyConfig;
// }
//
// module.exports = setupForCorporateProxy(proxyConfig);

const PROXY_CONFIG = {
  '/api': {
    'target': 'https://www.just4u.co.il/api',
    'secure': false,
    'pathRewrite': {
      '^/api': ''
    },
    'changeOrigin': true,
    'logLevel': 'info'
  },
  '/oldapi': {
    'target': 'https://www.just4u.co.il/Api/connections',
    'secure': false,
    'pathRewrite': {
      '^/oldapi': '/'
    },
    'changeOrigin': true,
    'logLevel': 'info'
  }
  
};

module.exports = PROXY_CONFIG;
