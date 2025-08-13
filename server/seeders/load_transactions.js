// Imports for file operations and database connection
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { pool } from "../conection_db.js";


// Load transactions from CSV into database
export async function loadTransactionsIntoDatabase() {
    const filePath = path.resolve('server/data/02_transactions.csv');
    const transactions = [];

    return new Promise((resolve, reject) => {
        // // Create read stream and pipe through CSV parser
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                // Format loan data
                transactions.push([
                    row.id_transaction,
                    row.date_time,
                    row.amount,
                    row.type_transaction,
                    row.id_customer,
                ]);
            })
            .on('end', async () => {
                try {
                    // Bulk insert transactions
                    const [result] = await pool.query(
                        'INSERT INTO transactions (id_transaction, date_time, amount, type_transaction, id_customer) VALUES ?', 
                        [transactions]
                    );
                    console.log(`✅ ${result.affectedRows} transactions inserted`);
                    resolve();
                } catch (error) {
                    console.error('❌ Insert error:', error.message);
                    reject(error);
                }
            })
            .on('error', (err) => {
                console.error('❌ CSV read error:', err.message);
                reject(err);
            });
    });
}