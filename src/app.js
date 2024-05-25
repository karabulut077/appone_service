
// load environment variables from .env file
require('dotenv').config();

const getAllProducts = require('./database.js').getAllProducts;
const express = require('express');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/products', (req, res) => {
    // TODO: log requests
    console.log("/products hit");

    getAllProducts()
        .then(data => {
            res.status(200).json({
                error_status: false,
                error_message: "",
                data: Array.isArray(data)? data: [data]
            });
        })
        .catch(err => {
            res.status(500).json({
                error_status: true,
                error_message: err,
                data: []
            });
        });
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
    console.log(`server started on port ${port} ...`);
});