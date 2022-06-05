import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import fastifyAutoload from '@fastify/autoload';
import fastifyMetrics from 'fastify-metrics';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = async (fastify, opts) => {
    fastify.register(fastifyMetrics, {
        prefix: 'server_',
        endpoint: '/metrics',
        blacklist: [],
        enableDefaultMetrics: true,
        enableRouteMetrics: true,
    });
    fastify.register(fastifyAutoload, {
        dir: join(__dirname, 'plugins'),
        opts: opts,
    });

    fastify.get('/ping', async (_, reply) => {
        reply.code(200).send({ message: 'pong' });
    });
};

export { app };
