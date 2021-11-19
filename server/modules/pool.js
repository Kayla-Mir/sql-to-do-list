const pg = require('pg');

const Pool = pg.Pool;

const pool = new Pool({
    database: 'weekend-to-do-app',
    host: 'localhost'
});

pool.on('connect', () => {
    console.log('Postgresql connected.');
});

pool.on('error', (error) => {
    console.log('Error with postgresql pool.', error);
});

module.exports = pool;
