import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT } = process.env;

const pool = mysql.createPool({
    host: DB_HOST || '127.0.0.1',
    port: parseInt(DB_PORT || '3309', 10),
    user: DB_USER || 'root',
    password: DB_PASSWORD || 'ArmMcu24!',
    
    // 🔴 CHANGE THIS FALLBACK: Set it to campus_club_hub directly!
    database: DB_DATABASE || 'campus_club_hub', 
    
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;