
// load environment variables from .env file
require('dotenv').config();

const getAllProducts = require('./database.js').getAllProducts;
const express = require('express');

const app = express();
const port = process.env.PORT;

app.use(express.json());

/*let data = [
    { id: 1, name: "Name 1" },
    { id: 2, name: "Name 2" },
];*/


app.get('/products', (req, res) => {
    console.log("/products hit");
    let products = getAllProducts();
    res.status(200).json(products);
});

/*app.get('/api/data/:id', basicAuth, (req, res) => {
    const id = parseInt(req.params.id);
    const item = data.find(d => d.id === id);
    
    if (!item) {
        return res.status(404).json({ message: "Böyle bir veri bulunamadı." });
    }

    res.status(200).json(item);
});*/

/*app.post('/api/data', (req, res) => {
    const newItem = {
        id: data.length + 1,
        name: req.body.name,
    };
    
    data.push(newItem);
    res.status(201).json(newItem);
});*/

app.listen(port, () => {
    console.log(`server started on port ${ port } ...`);
});