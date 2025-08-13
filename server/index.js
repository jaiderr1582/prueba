import cors from "cors";
import express from "express";
import { pool } from "./conection_db.js";

const app = express();
app.use(cors()); // Allows the backend to be consumed by frontend applications
app.use(express.json()); // Enables automatic JSON parsing for POST/PUT requests

// Get all customers
app.get('/customers', async (req, res) => {
    try {
        const [rows] = await pool.query(`
        SELECT
            customers.id_customer,
            customers.name_customer,
            customers.identification_number,
            customers.address,
            customers.phone,
            customers.email,
            customers.platform_used
            from customers
        `);

        res.json(rows);

    } catch (error) {
        res.status(500).json({
            status: 'error',
            endpoint: req.originalUrl,
            method: req.method,
            message: error.message
        });
    }
});

// Get single user by ID
app.get('/customers/:id_customer', async (req, res) => {
    try {
        const { id_customer } = req.params;

        const [rows] = await pool.query(`
        SELECT 
            customers.id_customer,
            customers.name_customer,
            customers.identification_number,
            customers.address,
            customers.phone,
            customers.email,
            customers.platform_used
            from customers
            where customers.id_customer = ?
        `, [id_customer]);

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            endpoint: req.originalUrl,
            method: req.method,
            message: error.message
        });
    }
});


// create customer

app.post('/customers', async (req, res) => {
    try {
        const {
            id_customer,
            name_customer,
            identification_number,
            address,
            phone,
            email,
            platform_used
        } = req.body

        const query = `
        INSERT INTO customers 
        (id_customer, name_customer, identification_number, address, phone, email, platform_used)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `
        const values = [
            id_customer,
            name_customer,
            identification_number,
            address,
            phone,
            email,
            platform_used
        ]

        const [result] = await pool.query(query, values)

        res.status(201).json({
            mensaje: "Customer has been created"
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            endpoint: req.originalUrl,
            method: req.method,
            message: error.message
        });
    }
})

// update customer

app.put('/customers/:id_customer', async (req, res) => {
    try {
        const { id_custom } = req.params

        const {
            id_customer,
            name_customer,
            identification_number,
            address,
            phone,
            email,
            platform_used
        } = req.body

        const query = `
        UPDATE customers SET 
            name_customer = ?,
            identification_number = ?,
            address = ?,
            phone = ?,
            email = ?,
            platform_used = ?
        WHERE id_customer = ?
        `
        const values = [
            id_customer,
            name_customer,
            identification_number,
            address,
            phone,
            email,
            platform_used
        ]

        const [result] = await pool.query(query, values)

        if (result.affectedRows != 0) {
            return res.json({ mensaje: "Customers has been updated" })
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            endpoint: req.originalUrl,
            method: req.method,
            message: error.message
        });
    }
})

// delete customer

app.delete('/customers/:id_customer', async (req, res) => {
    try {
        const { id_customer } = req.params

        const query = `
        DELETE FROM customers WHERE id_customer = ?
        `
        const values = [
            id_customer
        ]

        const [result] = await pool.query(query, values)

        if (result.affectedRows != 0) {
            return res.json({ mensaje: "customer has been deleted" })
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            endpoint: req.originalUrl,
            method: req.method,
            message: error.message
        });
    }
})

app.listen(3000, () => {
    console.log("Server running successfully on http://localhost:3000/customers");
});