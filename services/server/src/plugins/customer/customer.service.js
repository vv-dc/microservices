import { getLogger } from "../../logger.js";

export class CustomerService {
    #customerDao;
    #notifierService;
    #logger;

    constructor(customerDao, notifierService) {
        this.#customerDao = customerDao;
        this.#notifierService = notifierService;
        this.#logger = getLogger('customer-service');
    }

    async getCustomerById(customerId) {
        const customer = await this.#customerDao.findCustomerById(customerId);
        if (!customer) {
            throw new Error('Customer not found!');
        }
        return customer;
    }

    async createCustomer(createCustomerDto) {
        const customer = await this.#customerDao.createCustomer(createCustomerDto);
        await this.#notifierService.notifyNewCustomer(customer);
        await this.#notifierService.notifyCustomerEvent(customer.id, 'create');

        this.#logger.info(`Created customer: id=${customer.id}`);
        return customer;
    }

    async deleteCustomerById(customerId) {
        const customer = await this.#customerDao.deleteCustomerById(customerId);
        if (!customer) return;
        await this.#notifierService.notifyCustomerEvent(customer.id, 'delete');
        
        this.#logger.info(`Deleted customer: id=${customer.id}`)
        return customer;
    }

    async updateCustomerById(customerId, updateCustomerDto) {
        const customer = await this.#customerDao.updateCustomerById(
            customerId,
            updateCustomerDto
        );
        if (!customer) return;
        await this.#notifierService.notifyCustomerEvent(customer.id, 'update');
        
        this.#logger.info(`Updated customer: id=${customer.id}`);
        return customer;
    }
}
