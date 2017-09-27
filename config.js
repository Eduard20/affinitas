
/**
 * Node.js App configs
 */

const config = {

    jwtSecret: 'wecvh2k0#2ehcvwg$32r38nws8W', // JWT secret
    port: parseInt(process.env.PORT, 10) || 3000,
    hostname: '127.0.0.1',

};

module.exports = config;