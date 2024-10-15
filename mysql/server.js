  const express = require('express');
  const mysql = require('mysql');
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const app = express();

  // Middleware
  app.use(cors());
  app.use(bodyParser.json());

  // MySQL Connection
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Add your MySQL root password
    database: 'crud_db'
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
  });

  // CRUD Operations
  // Get All Users
  app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (err, rows) => {
      if (err) throw err;
      res.json(rows);
    });
  });

  // Add User
  app.post('/users', (req, res) => {
      const { name, email, phone } = req.body;
      const sql = 'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)';
      connection.query(sql, [name, email, phone], (err, result) => {
        if (err) throw err;
        res.json({ message: 'User added', id: result.insertId });
      });
    });
    

  // Update User
  app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = req.body;
    const sql = 'UPDATE users SET ? WHERE id = ?';
    connection.query(sql, [user, id], (err) => {
      if (err) throw err;
      res.json({ message: 'User updated' });
    });
  });

  // Delete User
  app.delete('/users/:id', (req, res) => {
      const { id } = req.params;
      console.log('Received delete request for id:', id); // Log the received id
      const sql = 'DELETE FROM users WHERE id = ?';
      connection.query(sql, id, (err) => {
        if (err) {
          console.error('Error deleting user:', err); // Log errors
          return res.status(500).json({ error: 'Failed to delete user' });
        }
        res.json({ message: 'User deleted' });
      });
    });
    

  // Start server
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
