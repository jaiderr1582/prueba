// Imports for file operations and database connection
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { pool } from "../conection_db.js";

// Loads customers data from CSV into database
export async function loadCustomersIntoDatabase() {
    const filePath = path.resolve('server/data/01_customers.csv');
    const customers = []; // Stores parsed book data

    return new Promise((resolve, reject) => {
        // Read and parse CSV file
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                // Format and store each book record
                customers.push([
                    row.id_customer,
                    row.name_customer,
                    row.identification_number.trim(), // Clean title whitespace
                    row.address,
                    row.phone,
                    row.email,
                    row.platform_used
                ]);
            })
            .on('end', async () => {
                try {
                    // Bulk insert all customers
                    const [result] = await pool.query(
                        'INSERT INTO customers (id_customer,name_customer,identification_number,address,phone,email,platform_used) VALUES ?',
                        [customers]
                    );
                    console.log(`✅ ${result.affectedRows} customers inserted`);
                    resolve();
                } catch (error) {
                    console.error('❌ Database insert failed:', error.message);
                    reject(error);
                }
            })
            .on('error', (err) => {
                console.error('❌ CSV processing error:', err.message);
                reject(err);
            });
    });
}
