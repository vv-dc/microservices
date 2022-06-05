import fp from 'fastify-plugin';

const prometheus = async (fastify) => {
    const { client: promClient } = fastify.metrics;

    new promClient.Counter({
        name: 'customer_api_http_requests_total',
        help: 'Total number of HTTP requests to cutomer API',
        labelNames: ['operation'],
    });
};

export default fp(prometheus, { name: 'prometheus' });
