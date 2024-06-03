require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://kos-racuni.firebaseio.com'
});

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());


app.get('/api/get-services', async (req, res) => {
  try {
    const db = admin.firestore();
    const snapshot = await db.collection('services').get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.post('/api/add-service', async (req, res) => {
  try {
    const db = admin.firestore();
    const data = req.body;
    const docRef = await db.collection('services').add(data);
    res.json({ message: 'Service added', id: docRef.id });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.delete('/api/delete-service/:id', async (req, res) => {
  try {
    const db = admin.firestore();
    const id = req.params.id;
    await db.collection('services').doc(id).delete();
    res.json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get('/api/get-offers', async (req, res) => {
  try {
    const db = admin.firestore();
    const snapshot = await db.collection('offers').get();
    const offers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(offers);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.post('/api/add-offer', async (req, res) => {
  try {
    const db = admin.firestore();
    const offer = req.body;
    const docRef = await db.collection('offers').add(offer);
    res.json({ id: docRef.id, ...offer });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.delete('/api/delete-offer/:id', async (req, res) => {
  try {
    const db = admin.firestore();
    const id = req.params.id;
    await db.collection('offers').doc(id).delete();
    res.json({ message: 'Offer deleted' });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get('/api/get-customers', async (req, res) => {
  try {
    const db = admin.firestore();
    const snapshot = await db.collection('customers').get();
    const customers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(customers);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.post('/api/add-customer', async (req, res) => {
  try {
    const db = admin.firestore();
    const customer = req.body;
    const docRef = await db.collection('customers').add(customer);
    res.json({ id: docRef.id, ...customer });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});