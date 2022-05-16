import { config } from '../../config.js';

const { exchange, queue, routingKey } = config.broker;

export class BrokerService {
    static #EVENT_MAP = {
        'new-customer': { exchange, queue, pattern: routingKey },
    };
    #channel;

    constructor(channel) {
        this.#channel = channel;
    }

    async #prepareProducer({ exchange, queue, pattern }) {
        await this.#channel.assertExchange(exchange.name, exchange.type, {
            durable: exchange.durable,
        });
        await this.#channel.assertQueue(queue.name, { durable: queue.durable });
        await this.#channel.bindQueue(queue.name, exchange.name, pattern);
    }

    async subscribeSingle(event, handler) {
        const producerOptions = BrokerService.#EVENT_MAP[event];
        await this.#prepareProducer(producerOptions);

        this.#channel.prefetch(1);
        await this.#channel.consume(
            producerOptions.queue.name,
            async (message) => {
                const content = JSON.parse(message.content.toString());
                await handler(content);
                this.#channel.ack(message);
            }
        );
    }

    static async build(broker) {
        const channel = await broker.createChannel();
        return new BrokerService(channel);
    }
}
