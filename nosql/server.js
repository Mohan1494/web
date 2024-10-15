const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/crud_db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Mongoose User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String
});

const User = mongoose.model('User', userSchema);

// CRUD Operations
// Get All Users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Add User
app.post('/users', async (req, res) => {
  const { name, email, phone } = req.body;
  const newUser = new User({ name, email, phone });

  try {
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add user' });
  }
});

// Update User
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });
    res.json({ message: 'User updated', user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete User
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
