import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'my_data_base',
    password: '0811',
    port: 5432
})

export default pool;