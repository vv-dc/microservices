require('dotenv/config');

const config = {
    server: {
        host: process.env.SERVER_HOST ?? '0.0.0.0',
        port: process.env.SERVER_PORT ?? 3000
    }
};

module.exports = { config };
