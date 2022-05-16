import rabbitmq from './plugins/broker/index.js';
import email from './plugins/email/index.js';

export const app = async (fastify) => {
    fastify.register(rabbitmq);
    fastify.register(email);
};
