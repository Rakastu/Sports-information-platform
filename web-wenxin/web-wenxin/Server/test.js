const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'supply',
  database: 'Training_management'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// API to authenticate user
app.post('/login', (req, res) => {
  const { username } = req.body;
  // Here you would perform authentication, for simplicity let's assume any username is valid
  res.json({ success: true, user: username });
});

// API to get training plans
app.get('/training_plans', (req, res) => {
  connection.query('SELECT * FROM Training_Plan', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
