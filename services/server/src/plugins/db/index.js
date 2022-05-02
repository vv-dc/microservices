import fp from 'fastify-plugin';
import knex from 'knex';
import { config } from '../../config.js';

const db = async (fastify) => {
    const connection = knex({
        client: 'pg',
        connection: config.database,
        pool: { min: 2, max: 10 },
    });
    fastify.decorate('db', connection);
};

export default fp(db, { name: 'db' });