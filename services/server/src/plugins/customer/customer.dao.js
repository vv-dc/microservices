export class CustomerDao {
    constructor(db) {
        this.db = db;
    }

    findCustomerById(customerId) {
        return this.db('customers')
            .where({ id: customerId })
            .first();
    }

    async deleteCustomerById(customerId) {
        const customers = await this.db('customers')
            .delete()
            .where({ id: customerId })
            .returning('*');
        return customers[0];
    }
    
    async updateCustomerById(customerId, updateCustomerDto) {
        const { id, ...rest } = updateCustomerDto; // do not allow changing of id
        const customers = await this.db('customers')
            .update(rest)
            .where({ id: customerId })
            .returning('*');
        return customers[0];
    }

    async createCustomer(createCustomerDto) {
        const customers = await this.db('customers')
            .insert(createCustomerDto)
            .returning('*');
        return customers[0];
    }
}
