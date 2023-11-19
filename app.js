const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Middleware to parse incoming request bodies
app.use(express.json());

// MySQL database connection
const db = mysql.createConnection({
    host: '34.93.74.195',
    user: 'rrs-db',
    password: "+5#)5_rYXAl$81'K",
    database: 'test',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Define your REST APIs here
// ...

// Get all users
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.json(results);
        }
    });
});

// Get a specific user by ID
app.get('/users/:ssn', (req, res) => {
    const userId = req.params.ssn;
    db.query('SELECT * FROM users WHERE ssn = ?', [userId], (err, results) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.json(results[0]);
        }
    });
});

// Create a new user
app.post('/users', (req, res) => {
    const newUser = req.body;
    db.query('INSERT INTO users SET ?', newUser, (err, result) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.json({ id: result.insertId });
        }
    });
});

// Update a user by ID
app.put('/users/:ssn', (req, res) => {
    const userId = req.params.ssn;
    const updatedUser = req.body;
    db.query('UPDATE users SET ? WHERE ssn = ?', [updatedUser, userId], (err) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.sendStatus(200);
        }
    });
});

// Delete a user by ID
app.delete('/users/:ssn', (req, res) => {
    const userId = req.params.ssn;
    db.query('DELETE FROM users WHERE ssn = ?', [userId], (err) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.sendStatus(200);
        }
    });
});

// ...


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
