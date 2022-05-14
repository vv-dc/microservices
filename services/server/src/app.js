import customer from './plugins/customer/index.js'
import db from './plugins/db/index.js';

const app = async (fastify, opts) => {
    fastify.register(db);
    fastify.register(customer);
    
    fastify.get('/ping', async (request, reply) => {
        reply.code(200).send({ message: 'pong' });
    });
};

export { app };