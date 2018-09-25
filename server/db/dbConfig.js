import { Pool } from 'pg';

const connectionString = 'postgresql://chidimma:password@localhost:5432/stack';
const pool = new Pool({ 
    connectionString
})
// const pool = new Pool(connectionString);

export default pool;
