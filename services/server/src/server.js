import fastify from 'fastify';
import { app } from './app.js'
import { config } from './config.js';

const { port, host, logger } = config.server;

const bootstrap = async (app) => {
    try {
        const server = fastify({
            logger,
        });
        server.register(app);
        await server.listen(port, host);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

bootstrap(app);
