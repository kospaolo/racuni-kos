require('dotenv').config();
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});