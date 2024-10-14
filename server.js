const express = require('express');
const pool = require('./db'); // Your db connection file

const app = express();
const PORT = process.env.PORT || 8000; // 8000 as a fallback

app.use(express.json()); // Middleware to parse JSON

// Question 1.

app.get('/patients', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients');
        res.status(200).json(rows); // Return the result as JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while retrieving patients.' });
    }
});

// Question 2.

app.get('/providers', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT first_name, last_name, provider_specialty FROM providers');
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while retrieving providers.' });
    }
});

// Question 3.

app.get('/patients/first-name/:firstName', async (req, res) => {
    const firstName = req.params.firstName; // Get the first name from the URL parameters
    try {
        const [rows] = await pool.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?', [firstName]);
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while retrieving patients.' });
    }
});


// Question 4.

app.get('/providers/specialty/:specialty', async (req, res) => {
    const specialty = req.params.specialty; // Get the specialty from the URL parameters
    try {
        const [rows] = await pool.query('SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?', [specialty]);
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while retrieving providers.' });
    }
});




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
