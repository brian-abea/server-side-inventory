const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

let inventory = [];

app.get('/inventory', (req, res) => {
  res.send(inventory);
});

app.post('/inventory', (req, res) => {
  const newItem = req.body;
  inventory.push(newItem);
  res.send({ message: 'Item added successfully' });
});

app.get('/search', (req, res) => {
  const searchTerm = req.query.q.toLowerCase();
  const filteredInventory = inventory.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm);
  });
  res.send(filteredInventory);
});

app.listen(port, () => {
  console.log(`Server successifully running on port ${port}`);
});


//console.log('Hello world');