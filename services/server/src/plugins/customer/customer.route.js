import {
    customerParamsSchema,
    updateCustomerBodySchema,
    createCustomerBodySchema,
    customerSchema,
} from './customer.schema.js';

const metricName = 'customer_api_http_requests_total';

export const customerRoutes = async (fastify) => {
    const { client: promClient } = fastify.metrics;
    const { customerService } = fastify;
    const requestCount = await promClient.register.getSingleMetric(metricName);

    fastify.route({
        method: 'GET',
        url: '/customers/:customerId',
        schema: {
            params: customerParamsSchema,
            response: {
                200: customerSchema,
            },
        },
        handler: async (request, reply) => {
            const { customerId } = request.params;
            const customer = await customerService.getCustomerById(customerId);
            reply.code(200).send(customer);
        },
    });

    fastify.route({
        method: 'DELETE',
        url: '/customers/:customerId',
        schema: { params: customerParamsSchema },
        handler: async (request, reply) => {
            requestCount.labels('delete').inc();
            const { customerId } = request.params;
            await customerService.deleteCustomerById(customerId);
            reply.code(204).send();
        },
    });

    fastify.route({
        method: 'PUT',
        url: '/customers/:customerId',
        schema: { body: updateCustomerBodySchema },
        handler: async (request, reply) => {
            requestCount.labels('update').inc();
            const { customerId } = request.params;
            const updateCustomerDto = request.body;
            await customerService.updateCustomerById(
                customerId,
                updateCustomerDto
            );
            reply.code(204).send();
        },
    });

    fastify.route({
        method: 'POST',
        url: '/customers',
        schema: { body: createCustomerBodySchema },
        handler: async (request, reply) => {
            requestCount.labels('create').inc();
            const createCustomerDto = request.body;
            await customerService.createCustomer(createCustomerDto);
            reply.code(204).send();
        },
    });
};
