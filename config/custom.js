/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {
  /***************************************************************************
   *                                                                          *
   * Any other custom config this Sails app should use during development.    *
   *                                                                          *
   ***************************************************************************/
  // mailgunDomain: 'transactional-mail.example.com',
  // mailgunSecret: 'key-testkeyb183848139913858e8abd9a3',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  // …
  ExplorerUrl: ['https://stats.jccdex.cn'],
  IPNS: {
    key: 'jpass',
    value: 'k2k4r8kgh5g54wt86gywt5vvi48he4vet2mdj0mh7ihg41ki6v18k2uj'
  },
  ipfs: {
    gateWayUrl: ['http://192.168.66.16:8080'],
    clientApi: {
      host: '192.168.66.16',
      port: '9095',
      protocol: 'http'
    },
    clusterApi: {
      host: '192.168.66.16',
      port: '9094',
      protocol: 'http'
    }
  },
  ipfsCluster: {
    hosts: ['192.168.66.16', '192.168.66.17', '192.168.66.18'],
    gateWayPort: '8080',
    clientApiPort: '9095',
    clusterApiPort: '9094'
  }
};
