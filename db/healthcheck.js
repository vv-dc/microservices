const knexConfig = require('./knexfile');
const pgsql = require('knex')(knexConfig['development']);

(async () => {
    try {
        await pgsql.raw("SELECT 1");
        console.log("PostgreSQL connected");
    } catch (e) {
        console.log("PostgreSQL not connected");
        console.error(e);
    } finally {
        await pgsql.destroy()
    }
})();
