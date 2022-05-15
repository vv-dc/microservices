import { config } from "../../config.js";

const { mailing, logging } = config.broker.queue;

export class CustomerNotifierService {
    #brokerService;

    constructor(brokerService) {
        this.#brokerService = brokerService;
    }

    async notifyNewCustomer(customer) {
        const { id, email, fullName } = customer;
        const payload = { id, email, fullName };
        await this.#brokerService.publishDefault(mailing.newCustomerKey, payload);
    }

    async notifyCustomerEvent(customerId, type) {
        const payload = { id: customerId, type };
        await this.#brokerService.publishDefault(logging.customerEventKey, payload);
    }
}
