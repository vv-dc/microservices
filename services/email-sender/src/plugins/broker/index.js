import fp from 'fastify-plugin';
import amqp from 'amqplib';

import { BrokerService } from './broker.service.js';
import { config } from '../../config.js';

const rabbitmq = async (fastify) => {
    const connection = await amqp.connect(config.broker.connection);
    const brokerService = await BrokerService.build(connection);
    fastify.decorate('brokerService', brokerService);
};

export default fp(rabbitmq, {
    name: 'broker',
    decorators: ['brokerService'],
});
