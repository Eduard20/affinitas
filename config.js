
/**
 * Node.js App configs
 */

const config = {

    mode: 'development', // production
    jwtSecret: 'wecvh2k0#2ehcvwg$32r38nws8W', // JWT secret
    port: parseInt(process.env.PORT, 10) || 3000,
    hostname: '127.0.0.1',
    mongoConf: {
        url: 'mongodb://ds149551.mlab.com:49551/heroku_59hx7zzf',
        options: {
            db: { native_parser: true },
            server: { poolSize: 5 },
            user: 'admin',
            pass: 'admin'
        }
    }

};

module.exports = config;