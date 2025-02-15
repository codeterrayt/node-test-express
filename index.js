const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Create Express app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


// Home page route to display data s
app.get('/', (req, res) => {

    return res.send("this is from github directly CICD update , this update can be from the vs code too");

    
    // const db = mysql.createConnection({
    //     host: process.env.MYSQL_DB_HOST || 'MYSQL_DB_8.1.0_b55dd8b265',
    //     user: process.env.MYSQL_USER || 'root',
    //     password: process.env.MYSQL_PASSWORD || 'root',
    //     database: process.env.MYSQL_DATABASE || 'QD'
    // }); 
 
    
    // const getUsersQuery = 'SELECT * FROM users'; 
    // db.query(getUsersQuery, (err, results) => {
    //     if (err) throw err;
    //     res.render('index', { users: results });
    // });
});



app.get("/test", (req, res) => {

    // Try to connect to MySQL
    db.connect((err) => {
        if (err) {
            return res.status(500).json({
                message: 'Database connection failed',
                error: err.stack,
            });
        }

        // Once connected, you can ensure the table exists
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL
            )`;

        db.query(createTableQuery, (err) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error creating table',
                    error: err,
                });
            }
            console.log("Table 'users' ensured.");
        });

        // Send back success response with env variables 2
        return res.status(200).json({
            message: 'Connected to MySQL',
            env_variables: {
                DATABASE_USER: process.env.DATABASE_USER || 'root',
                DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'root',
                DATABASE_NAME: process.env.DATABASE_NAME || 'QD'
            }
        });
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
