const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sameera06', 
  database: 'carparunge',  
});

db.connect((err) => {
  if (err) {
    console.error('❌ DB connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL database');
  }
});


app.get('/api/cars', (req, res) => {
  const query = "SELECT * FROM cars WHERE status = 'available'";
  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Error fetching cars:', err);
      res.status(500).send('Error fetching cars');
    } else {
      res.json(results);
    }
  });
});


app.get('/api/cars/:id', (req, res) => {
  const carId = req.params.id;
  const query = 'SELECT * FROM cars WHERE id = ?';
  db.query(query, [carId], (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching car details');
    }
    res.json(results[0]);
  });
});


app.post('/api/cars', (req, res) => {
  const { owner_id, car_name, brand, model_year, price, status, image_url, contact_number } = req.body;
  const query = `
    INSERT INTO cars 
    (owner_id, car_name, brand, model_year, price, status, image_url, contact_number)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [owner_id, car_name, brand, model_year, price, status, image_url, contact_number], (err, result) => {
    if (err) {
      console.error('❌ Error inserting car:', err);
      return res.status(500).send('Failed to list car');
    }
    res.status(201).send('Car listed successfully');
  });
});


app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Server error' });
    }
    if (results.length > 0) {
      res.status(200).json({ success: true, user: results[0] });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});

app.post('/api/signup', (req, res) => {
  const { username, email, password } = req.body;
  const checkQuery = 'SELECT * FROM users WHERE username = ?';
  db.query(checkQuery, [username], (err, results) => {
    if (results.length > 0) {
      return res.status(409).json({ success: false, message: 'Username already exists' });
    }
    const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(insertQuery, [username, email, password], (err, result) => {
      if (err) {
        return res.status(500).send('Server error');
      }
      res.status(201).json({ success: true, message: 'User registered successfully' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
