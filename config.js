
/**
 * Node.js App configs
 */

const config = {

    mode: 'production', // development
    jwtSecret: 'wecvh2k0#2ehcvwg$32r38nws8W', // JWT secret
    port: parseInt(process.env.PORT, 10) || 3000,
    hostname: '127.0.0.1',
    mongoConf: {
        url: 'mongodb://ds151554.mlab.com:51554/affinitas',
        options: {
            db: { native_parser: true },
            server: { poolSize: 5 },
            user: 'admin',
            pass: 'admin'
        }
    }

};

module.exports = config;