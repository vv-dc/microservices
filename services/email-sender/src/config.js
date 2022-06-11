import 'dotenv/config';

export const config = {
    server: {
        host: process.env.HOST ?? '0.0.0.0',
        port: parseInt(process.env.PORT ?? 5000, 10),
        logger: true,
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
            name: process.env.RABBITMQ_DEFAULT_EXCHANGE,
            type: 'direct',
            durable: true,
        },
        queue: {
            name: process.env.RABBITMQ_EMAIL_QUEUE,
            durable: true,
        },
        routingKey: 'new-customer',
    },
    email: {
        transport: {
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT, 10),
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
            pool: true,
            maxMessages: Infinity,
            logger: false,
        },
        from: process.env.EMAIL_ADDRESS,
    },
};
