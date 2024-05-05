const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const PORT = 5000;
const MONGODB_URI = 'mongodb+srv://amaretere22:amex22@cluster0.zkrbbta.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

app.use(bodyParser.json());

// POST route to save location data
app.post('/api/locations', async (req, res) => {
  try {
    const client = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('places');
    const locationsCollection = db.collection('locations');

    const { name, description, location } = req.body;

    // Insert data into MongoDB Atlas
    await locationsCollection.insertOne({
      name,
      description,
      location
    });

    client.close();
    res.status(201).send('Location saved successfully!');
  } catch (error) {
    console.error('Error saving location:', error);
    res.status(500).send('Error saving location. Please try again.');
  }
});

// GET route to fetch all locations
app.get('/api/locations', async (req, res) => {
    try {
      const client = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
      const db = client.db('places');
      const locationsCollection = db.collection('locations');
  
      // Fetch all locations from MongoDB Atlas
      const locations = await locationsCollection.find({}).toArray();
  
      client.close();
      res.json(locations);
    } catch (error) {
      console.error('Error fetching locations:', error);
      res.status(500).send('Error fetching locations. Please try again.');
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
