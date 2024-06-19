
// load environment variables from .env file
require('dotenv').config();

const express = require('express');
const { getCommentsByProductId } = require('./database.js');
const app = express();
const port = process.env.PORT;
const getAllProducts = require('./database.js').getAllProducts;
const getProductById = require('./database.js').getProductById;
const getDetailsByProductId = require('./database.js').getDetailsByProductId;
const getBestSellerProducts = require('./database.js').getBestSellerProducts;

app.use(express.json());

// TODO: log requests

app.get('/products', (req, res) => {
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

app.get('/bestseller', (req, res) => {
    const count = req.query.count;
    console.log("/bestseller hit, requested count is", count);
    
    getBestSellerProducts(count)
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

app.get('/details', (req, res) => {
    const productId = req.query.product_id;
    console.log("/details hit, requested product id:", productId);

    getDetailsByProductId(productId)
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

app.get('/product', (req, res) => {
    const productId = req.query.id;
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