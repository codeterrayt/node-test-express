const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Create Express app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST || 'db',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'my_database'
});

// Connect to MySQL and create table if not exists
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL');

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL
        )`;
    
    db.query(createTableQuery, (err) => {
        if (err) throw err;
        console.log("Table 'users' ensured.");
    });
});

// Home page route to display data
app.get('/', (req, res) => {
    const getUsersQuery = 'SELECT * FROM users';
    db.query(getUsersQuery, (err, results) => {
        if (err) throw err;
        res.render('index', { users: results });
    });
});

// Post route to insert data from form
app.post('/add', (req, res) => {
    const { name, email } = req.body;
    const insertUserQuery = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(insertUserQuery, [name, email], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
