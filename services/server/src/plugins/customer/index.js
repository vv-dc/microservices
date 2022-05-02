import fp from "fastify-plugin";
import { CustomerDao } from "./customer.dao.js";
import { customerRoutes } from "./customer.route.js";
import { CustomerService } from "./customer.service.js";

export const customer = async (fastify) => {
    const { db } = fastify;
    const customerDao = new CustomerDao(db);
    const customerService = new CustomerService(customerDao);
    
    fastify.decorate('customerService', customerService);
    fastify.register(customerRoutes);
};

export default fp(customer, {
    name: 'customer',
    dependencies: ['db']
});