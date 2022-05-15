import { config } from "../../config.js";

const { mailing } = config.broker.queue;

export class CustomerService {
    constructor(customerDao, brokerService) {
        this.customerDao = customerDao;
        this.brokerService = brokerService;
    }

    async getCustomerById(customerId) {
        const customer = await this.customerDao.findCustomerById(customerId);
        if (!customer) {
            throw new Error('Customer not found!');
        }
        return customer;
    }

    async createCustomer(createCustomerDto) {
        const customer = await this.customerDao.createCustomer(createCustomerDto);
        await this.notifyNewCustomer(customer);
        return customer;
    }

    deleteCustomerById(customerId) {
        return this.customerDao.deleteCustomerById(customerId);
    }

    updateCustomerById(customerId, updateCustomerDto) {
        return this.customerDao.updateCustomerById(customerId, updateCustomerDto);
    }

    async notifyNewCustomer(customer) {
        const { queueName, newCustomerKey } = mailing;
        const { id, email, fullName } = customer;
        const payload = { id, email, fullName };
        await this.brokerService.publishDirect(queueName, newCustomerKey, payload);
    }
}
