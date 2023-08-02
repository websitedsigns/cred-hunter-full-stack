// server.js

const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 3001; // You can use any port number you like

app.use(bodyParser.json());

// Replace <password> and <dbname> with your actual credentials and database name
const mongoURI = 'mongodb://localhost:27017/';
const dbName = 'coaster'; // Replace 'coaster' with your desired database name

MongoClient.connect(mongoURI, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    const coasterCollection = db.collection('coasters'); // Replace 'coasters' with your desired collection name

    // Define API endpoints here
    // Endpoint for adding a new coaster
    app.post('/api/coasters', async (req, res) => {
      try {
        const newCoaster = req.body;
        const result = await coasterCollection.insertOne(newCoaster);
        if (result.insertedCount === 1) {
          const insertedCoaster = result.ops[0];
          res.status(201).json(insertedCoaster);
        } else {
          res.status(500).json({ message: 'Failed to add coaster' });
        }
      } catch (error) {
        console.error('Error adding coaster:', error);
        res.status(500).json({ message: 'Failed to add coaster' });
      }
    });

    // Endpoint for removing a coaster
    app.delete('/api/coasters/:id', async (req, res) => {
      try {
        const coasterId = req.params.id;
        const result = await coasterCollection.deleteOne({ _id: ObjectId(coasterId) });
        if (result.deletedCount === 1) {
          res.status(200).json({ message: 'Coaster removed successfully' });
        } else {
          res.status(404).json({ message: 'Coaster not found' });
        }
      } catch (error) {
        console.error('Error removing coaster:', error);
        res.status(500).json({ message: 'Failed to remove coaster' });
      }
    });

    // Endpoint for fetching all coasters
    app.get('/api/coasters', async (req, res) => {
      try {
        const coasters = await coasterCollection.find({}).toArray();
        res.status(200).json(coasters);
      } catch (error) {
        console.error('Error fetching coasters:', error);
        res.status(500).json({ message: 'Failed to fetch coasters' });
      }
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
