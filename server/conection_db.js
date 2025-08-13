import mysql from "mysql2/promise";

export const pool = mysql.createPool({
    host: "b19jo72qgyt3pnzyndir-mysql.services.clever-cloud.com",
    database: "b19jo72qgyt3pnzyndir",
    user: "udfqc4gikrwrvh3x",
    password: "t74t5FMl4O38UJhJ6K2r",
    connectionLimit: 10,        // Maximum number of active connections at the same time
    waitForConnections: true,   // If limit is reached, new requests wait in queue
    queueLimit: 0               // Maximum number of queued requests (0 = no limit)
});

async function testDatabaseConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Database connection successful');
        connection.release();
    } catch (error) {
        console.error('❌ Database connection error:', error.message);
    }
}
