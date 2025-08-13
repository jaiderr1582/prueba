// Import data loading functions from respective files
import { loadTransactionsIntoDatabase } from "./load_transactions.js";
import { loadBillsIntoDatabase } from "./load_bills.js";
import { loadCustomersIntoDatabase } from "./load_customers.js";

// Self-executing async function to run seeders
(async () => {
    try {
        console.log('🚀 Starting seeders...');

        // Execute seeders in sequence (customers → transactions → bills)
        await loadCustomersIntoDatabase();  // First load customers (foreign key dependency)
        await loadTransactionsIntoDatabase(); // Then load transactions (depends on customers)
        await loadBillsIntoDatabase(); // Finally load bills (depends on transaction)

        console.log('✅ All seeders executed successfully.');
    } catch (error) {
        // Catch and log any errors during seeding
        console.error('❌ Error running seeders:', error.message);
    } finally {
        // Ensure process exits after completion (success or failure)
        process.exit();
    }
})();