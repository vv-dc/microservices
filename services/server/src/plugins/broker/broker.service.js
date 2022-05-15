export class BrokerService {
    constructor(broker) {
        this.broker = broker;
    }

    serializeMessage(message) {
        return Buffer.from(JSON.stringify(message));
    }

    async publishDirect(queue, pattern, message) {
        const channel = await this.broker.createChannel();
        await channel.bindQueue(queue, 'amq.direct', pattern);
        const serialized = this.serializeMessage(message);
        await channel.sendToQueue(queue, serialized);
        await channel.close();
    }
}