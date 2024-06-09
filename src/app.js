
// load environment variables from .env file
require('dotenv').config();

const express = require('express');
const { getCommentsByProductId } = require('./database.js');
const app = express();
const port = process.env.PORT;
const getAllProducts = require('./database.js').getAllProducts;
const getProductById = require('./database.js').getProductById;

app.use(express.json());

app.get('/product', (req, res) => {
    const productId = req.query.id;
    // TODO: log requests
    console.log("/product hit, requested product id:", productId);

    getProductById(productId)
        .then(data => {
            res.status(200).json({
                data: data
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                errmsg: "db error"
            });
        });
});

app.get('/products', (req, res) => {
    // TODO: log requests
    console.log("/products hit");
    // hiç veri gelmezse testini brands tablosunda yap
    getAllProducts()
        .then(data => {
            res.status(200).json({
                data: data
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                errmsg: "db error"
            });
        });
});

app.get('/comments', (req, res) => {
    const productId = req.query.id;
    // TODO: log requests
    console.log("/comments hit, requested product id:", productId);

    getCommentsByProductId(productId)
        .then(data => {
            res.status(200).json({
                data: data
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                errmsg: "db error"
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