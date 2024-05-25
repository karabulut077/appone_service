
require('dotenv').config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_ATLAS_CONNECTION_STRING;
const client = new MongoClient(uri);

exports.getAllProducts = async function () {
    try {
        await client.connect();

        const database = client.db("appone");
        const products_collection = database.collection("products");

        const query = {};
        const products = await products_collection.find(query).toArray();

        return Promise.resolve(products);
    }
    catch (error) {
        // TODO: log errors
        // return common error message for all type of errors
        console.log(error);
        return Promise.reject(error);
    }
    finally {
        await client.close();
    }
}