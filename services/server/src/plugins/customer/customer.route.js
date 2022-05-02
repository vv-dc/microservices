import { 
    customerParamsSchema,
    updateCustomerBodySchema,
    createCustomerBodySchema,
    customerSchema,
} from './customer.schema.js';

export const customerRoutes = async (fastify) => {
    const { customerService } = fastify;

    fastify.route({
        method: 'GET',
        url: '/customers/:customerId',
        schema: { 
            params: customerParamsSchema,
            response: {
                200: customerSchema,
            }
        },
        handler: async (request, reply) => {
            const { customerId } = request.params;
            request.log.warn(JSON.stringify(customerId));
            const customer = await customerService.getCustomerById(customerId);
            request.log.warn(JSON.stringify(customer));
            reply.code(200).send(customer);
        },
    });

    fastify.route({
        method: 'DELETE',
        url: '/customers/:customerId',
        schema: { params: customerParamsSchema },
        handler: async (request, reply) => {
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
            const { customerId } = request.params;
            const updateCustomerDto = request.body;
            await customerService.updateCustomerById(customerId, updateCustomerDto);
            reply.code(204).send();
        }
    });

    fastify.route({
        method: 'POST',
        url: '/customers',
        schema: { body: createCustomerBodySchema },
        handler: async (request, reply) => {
            const createCustomerDto = request.body;
            await customerService.createCustomer(createCustomerDto);
            reply.code(204).send();
        }
    })
}
