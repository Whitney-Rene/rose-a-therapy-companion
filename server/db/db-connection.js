import pkg from 'pg';
const { Pool } = pkg;

console.log(process.env.DB_URI)

const db = new Pool ({
    connectionString: process.env.DB_URI
});

export default db; 