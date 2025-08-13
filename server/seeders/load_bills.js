// Imports for file operations and database connection
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { pool } from "../conection_db.js";

// Load bills from CSV into database
export async function loadBillsIntoDatabase() {
    const filePath = path.resolve('server/data/03_bills.csv'); // Get absolute path to CSV
    const bills = []; // Array to store parsed user data

    return new Promise((resolve, reject) => {
        // Read and parse CSV file
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                // Format and store each user record
                bills.push([
                    row.id_bill,
                    row.name_bill.trim(), // Trim whitespace from name
                    row.billing_period,
                    row.amount_bill,
                    row.amount_paid,
                    row.id_transaction
                ]);
            })
            .on('end', async () => {
                try {
                    // Bulk insert all bills into database
                    const sql = 'INSERT INTO bills (id_bill, name_bill, billing_period, amount_bill, amount_paid, id_transaction) VALUES ?';
                    const [result] = await pool.query(sql, [bills]);

                    console.log(`✅ Successfully inserted ${result.affectedRows} bills.`);
                    resolve(); // Operation completed successfully
                } catch (error) {
                    console.error('❌ Error inserting bills:', error.message);
                    reject(error); // Forward the error
                }
            })
            .on('error', (err) => {
                // Handle file reading errors
                console.error('❌ Error reading bills CSV file:', err.message);
                reject(err);
            });
    });
}