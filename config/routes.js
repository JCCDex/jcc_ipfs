/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */
const defaultRoutes = {
  '/': { view: 'pages/homepage' }
};

const v0 = {
  'post /api/v0/write': { action: 'v0/write' },
  'post /api/v0/writemain': { action: 'v0/writemain' },
  'post /api/v0/syncing/:hash': { action: 'v0/syncing' },
  'post /api/v0/read/:hash': { action: 'v0/read' },
  'post /api/v0/remove/:hash': { action: 'v0/remove' },
  'post /api/v0/update/:hash': { action: 'v0/update' },
  'post /api/v0/list/:address': { action: 'v0/list' }
};

module.exports.routes = Object.assign({}, defaultRoutes, v0);
