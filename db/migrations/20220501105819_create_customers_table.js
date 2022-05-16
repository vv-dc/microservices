exports.up = function (knex) {
    return knex.schema.createTable('customers', (table) => {
        table.increments('id').primary();
        table.string('email', 255).notNullable().unique();
        table.string('phone_number', 15).nullable();
        table.string('full_name', 255).notNullable();
        table.string('sex', 255).notNullable();
        table.date('date_of_birth').nullable();
        table.string('location', 2048).nullable();
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('customers');
};
