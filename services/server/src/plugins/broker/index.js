import fp from 'fastify-plugin';
import amqlib from 'amqplib';
import { config } from '../../config.js';
import { BrokerService } from './broker.service.js';

const rabbitmq = async (fastify) => {
    const connection = await amqlib.connect(config.broker.connection);
    const brokerService = new BrokerService(connection);
    fastify.decorate('brokerService', brokerService);
};

export default fp(rabbitmq, { name: 'broker' });
