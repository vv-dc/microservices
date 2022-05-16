export const customerParamsSchema = {
    customerId: { type: 'number' },
};

export const createCustomerBodySchema = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' },
        phone_number: { type: 'string' },
        full_name: { type: 'string' },
        sex: { type: 'string' },
        location: { type: 'string' },
        date_of_birth: { type: 'string', format: 'date' },
    },
    additionalProperties: false,
    required: ['email', 'full_name', 'sex'],
};

export const updateCustomerBodySchema = {
    type: 'object',
    properties: createCustomerBodySchema.properties,
    additionalProperties: false,
    required: [],
};

export const customerSchema = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        ...createCustomerBodySchema.properties,
    },
    additionalProperties: false,
    required: ['id', 'email', 'phone_number'],
};
