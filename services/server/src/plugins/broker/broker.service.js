import { config } from "../../config.js";

const { defaultExchange } = config.broker.exchange;

export class BrokerService {   
    #channel;

    constructor(channel) {
        this.#channel = channel;
    }
    
    static async build(broker) {
        const channel = await broker.createChannel();
        return new BrokerService(channel);
    }

    #serializeMessage(message) {
        return Buffer.from(JSON.stringify(message));
    }

    async publishDefault(pattern, message) {
        const { name, type, durable } = defaultExchange;
        await this.#channel.assertExchange(name, type, { durable });
        
        const serialized = this.#serializeMessage(message);
        await this.#channel.publish(name, pattern, serialized, { persistent: true });
    }
}
