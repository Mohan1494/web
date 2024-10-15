// server.js

const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB connection string
const client = new MongoClient(uri);
let registrationsCollection;

client.connect()
    .then(() => {
        registrationsCollection = client.db('Harish').collection('Haro');
        console.log('Connected to MongoDB');
    })
    .catch(err => console.error(err));

// API Routes

// Create a registration
app.post('/api/registrations', async (req, res) => {
    try {
        const result = await registrationsCollection.insertOne(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).send('Error registering');
    }
});

// Get all registrations
app.get('/api/registrations', async (req, res) => {
    try {
        const registrations = await registrationsCollection.find().toArray();
        res.json(registrations);
    } catch (err) {
        res.status(500).send('Error fetching registrations');
    }
});

// Update a registration
app.put('/api/registrations/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await registrationsCollection.updateOne(
            { _id: ObjectId(id) },
            { $set: req.body }
        );
        res.json(result);
    } catch (err) {
        res.status(500).send('Error updating registration');
    }
});

// Delete a registration
app.delete('/api/registrations/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await registrationsCollection.deleteOne({ _id: ObjectId(id) });
        res.json(result);
    } catch (err) {
        res.status(500).send('Error deleting registration');
    }
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'mongodb.html'));
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});