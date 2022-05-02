export class CustomerService {
    constructor(customerDao) {
        this.customerDao = customerDao;
    }

    async getCustomerById(customerId) {
        const customer = await this.customerDao.findCustomerById(customerId);
        if (!customer) {
            throw new Error('Customer not found!');
        }
        return customer;
    }

    createCustomer(createCustomerDto) {
        return this.customerDao.createCustomer(createCustomerDto);
    }

    deleteCustomerById(customerId) {
        return this.customerDao.deleteCustomerById(customerId);
    }

    updateCustomerById(customerId, updateCustomerDto) {
        return this.customerDao.updateCustomerById(customerId, updateCustomerDto);
    }
}
