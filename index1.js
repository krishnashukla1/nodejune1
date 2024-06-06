const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const DATA_FILE = './data.json';

// Read data from JSON file
const readData = () => JSON.parse(fs.readFileSync(DATA_FILE));

// Write data to JSON file
const writeData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// Create (POST)
app.post('/items', (req, res) => {
  const data = readData();
  const newItem = { ...req.body, id: Date.now() };
  data.push(newItem);
  writeData(data);
  res.status(201).json(newItem);
});

// Read (GET)
app.get('/items', (req, res) => res.json(readData()));

app.get('/items/:id', (req, res) => {
  const data = readData();
  const item = data.find(i => i.id === parseInt(req.params.id));
  item ? res.json(item) : res.status(404).json({ message: 'Item not found' });
});

// Update (PUT)
app.put('/items/:id', (req, res) => {
  const data = readData();
  const index = data.findIndex(i => i.id === parseInt(req.params.id));
  if (index !== -1) {
    data[index] = { ...data[index], ...req.body };
    writeData(data);
    res.json(data[index]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Delete (DELETE)
app.delete('/items/:id', (req, res) => {
  const data = readData();
  const newData = data.filter(i => i.id !== parseInt(req.params.id));
  if (newData.length !== data.length) {
    writeData(newData);
    res.json({ message: 'Item deleted' });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/*
POST---http://localhost:3000/items
{
    "name": "Mr ram Shukla",
    "age": 25,
    "address":"LKO"
}
----------------
GET--http://localhost:3000/items
GET--http://localhost:3000/items/1717683341941
{
    "name": "Mr ram Shukla",
    "age": 25,
    "address": "LKO",
    "id": 1717683341941
}

*/