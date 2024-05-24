
require('dotenv').config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_ATLAS_CONNECTION_STRING;
const client = new MongoClient(uri);

exports.getAllProducts = async function() {
    try {
        const database = client.db('appone');
        const products_collection = database.collection('products');

        const query = {};
        const find_cursor = products_collection.find(query);
        const products = await find_cursor.toArray();

        console.log(products);
        return products;
    }
    catch (error) {
        console.error('error while running getAllProducts():', error);
    }
    finally {
        await client.close();
    }
}