const knexConfig = require('./knexfile');
const pgsql = require('knex')(knexConfig['development']);

(async () => {
    try {
        await pgsql.raw("SELECT 1");
        console.log("PostgreSQL connected");
        process.exitCode == 0;
    } catch (e) {
        console.log("PostgreSQL not connected");
        process.exitCode = 1;
    } finally {
        await pgsql.destroy()
    }
})();
