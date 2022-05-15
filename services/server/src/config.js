import 'dotenv/config';

export const config = {
    server: {
        host: process.env.SERVER_HOST ?? '0.0.0.0',
        port: process.env.SERVER_PORT ?? 3000,
        logger: true,
    },
    database: {
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT ?? '', 10),
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
    },
    broker: {
        connection: {
            protocol: process.env.RABBITMQ_PROTOCOL,
            hostname: process.env.RABBITMQ_HOST,
            port: parseInt(process.env.RABBITMQ_PORT ?? '', 10),
            username: process.env.RABBITMQ_USERNAME,
            password: process.env.RABBITMQ_PASSWORD,
        },
        exchange: {
            defaultExchange: {
                name: 'custom-exchange',
                type: 'direct',
                durable: true,
            }
        },
        queue: {
            mailing: {
                newCustomerKey: 'new-customer',
            },
            logging: {
                customerEventKey: 'customer-event',
            }
        },
    },
};
