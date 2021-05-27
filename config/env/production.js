module.exports = {
  security: {
    cors: {
      allRoutes: true,
      allowOrigins: '*',
      allowAnyOriginWithCredentialsUnsafe: true,
      allowCredentials: true
    }
  },

  session: {},
  sockets: {
    onlyAllowOrigins: ['http://172.17.0.1']
  },
  custom: {
    ExplorerUrl: ['https://stats.jccdex.cn'],
    IPNS: {
      key: 'jpass',
      value: 'k2k4r8kgh5g54wt86gywt5vvi48he4vet2mdj0mh7ihg41ki6v18k2uj'
    },
    ipfs: {
      gateWayUrl: ['http://172.17.16.16:8080'],
      clientApi: {
        host: '172.17.16.16',
        port: '9095',
        protocol: 'http'
      },
      clusterApi: {
        host: '172.17.16.16',
        port: '9094',
        protocol: 'http'
      }
    },
    ipfsCluster: {
      hosts: ['172.17.16.16', '172.17.16.2', '172.17.16.6'],
      gateWayPort: '8080',
      clientApiPort: '9095',
      clusterApiPort: '9094'
    }
  }
};
