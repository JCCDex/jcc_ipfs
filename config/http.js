/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */
let swStats = require('swagger-stats');
let swaggerSpec = require('swagger-stats/examples/authtest/petstore.json');
module.exports.http = {
  /****************************************************************************
   *                                                                           *
   * Sails/Express middleware to run for every HTTP request.                   *
   * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
   *                                                                           *
   * https://sailsjs.com/documentation/concepts/middleware                     *
   *                                                                           *
   ****************************************************************************/

  middleware: {
    /***************************************************************************
     *                                                                          *
     * The order in which middleware should be run for HTTP requests.           *
     * (This Sails app's routes are handled by the "router" middleware below.)  *
     *                                                                          *
     ***************************************************************************/
    // order: [
    //   'cookieParser',
    //   'session',
    //   'bodyParser',
    //   'compress',
    //   'poweredBy',
    //   'router',
    //   'www',
    //   'favicon',
    // ],
    /***************************************************************************
     *                                                                          *
     * The body parser that will handle incoming multipart HTTP requests.       *
     *                                                                          *
     * https://sailsjs.com/config/http#?customizing-the-body-parser             *
     *                                                                          *
     ***************************************************************************/
    bodyParser: (function _configureBodyParser() {
      var skipper = require('skipper');
      var middlewareFn = skipper({ strict: true, limit: '10mb' });
      return middlewareFn;
    })(),

    order: [
      'swaggerStats',
      'cookieParser',
      'session',
      'bodyParser',
      'compress',
      'poweredBy',
      'router',
      'www',
      'favicon'
    ],

    swaggerStats: (function _configureSwaggerStats() {
      let swsOptions = {
        name: 'swagger-stats-sailsjs',
        version: '0.1.0',
        timelineBucketDuration: 60000,
        swaggerSpec: swaggerSpec,
        durationBuckets: [50, 100, 200, 500, 1000, 5000],
        requestSizeBuckets: [500, 5000, 15000, 50000],
        responseSizeBuckets: [600, 6000, 6000, 60000],
        // Make sure both 50 and 50*4 are buckets in durationBuckets,
        // so Apdex could be calculated in Prometheus
        apdexThreshold: 50,
        onResponseFinish: function (req, res, rrr) {
          debug('onResponseFinish: %s', JSON.stringify(rrr));
        },
        authentication: false
      };
      return swStats.getMiddleware(swsOptions);
    })()
  }
};
