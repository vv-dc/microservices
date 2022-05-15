export class BrokerService {
    constructor(broker) {
        this.broker = broker;
    }

    #serializeMessage(message) {
        return Buffer.from(JSON.stringify(message));
    }

    #createChannel() {
        return this.broker.createChannel();
    }

    async publishDirect(queue, pattern, message, durable = true) {
        const channel = await this.#createChannel();
        await channel.assertQueue(queue, { durable });
        await channel.bindQueue(queue, 'amq.direct', pattern);
        const serialized = this.#serializeMessage(message);
        await channel.sendToQueue(queue, serialized, { persistent: true });
        await channel.close();
    }
}
