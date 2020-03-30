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
  'post /api/v0/add': { action: 'v0/add' }
};

module.exports.routes = Object.assign({}, defaultRoutes, v0);
