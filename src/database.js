
require('dotenv').config();

const { MongoClient, ObjectId } = require("mongodb");
const uri = process.env.MONGODB_ATLAS_CONNECTION_STRING;
const db_name = process.env.DB_NAME;
const products_collection_name = process.env.COLLECTION_NAME_OF_PRODUCTS;
const comments_collection_name = process.env.COLLECTION_NAME_OF_COMMENTS;
const client = new MongoClient(uri);

let isConnected = false;

exports.getProductById = async function (productId) {
    if (!isConnected) {
        await client.connect();
        isConnected = true;
    }

    try {
        const database = client.db(db_name);
        const products_collection = database.collection(products_collection_name);

        const query = { _id: new ObjectId(String(productId)) };
        const product = await products_collection.find(query).toArray();

        return Promise.resolve(product);
    }
    catch (error) {
        // TODO: log errors
        // return common error message for all type of errors
        return Promise.reject(error);
    }
    finally {
        // await client.close();
    }
}

exports.getAllProducts = async function () {
    if (!isConnected) {
        await client.connect();
        isConnected = true;
    }

    try {
        const database = client.db(db_name);
        const products_collection = database.collection(products_collection_name);

        const query = {};
        const products = await products_collection.find(query).toArray();

        return Promise.resolve(products);
    }
    catch (error) {
        // TODO: log errors
        // return common error message for all type of errors
        return Promise.reject(error);
    }
    finally {
        // await client.close();
    }
}

exports.getCommentsByProductId = async function (productId) {
    if (!isConnected) {
        await client.connect();
        isConnected = true;
    }

    try {
        const database = client.db(db_name);
        const comments_collection = database.collection(comments_collection_name);

        const query = { product_id: new ObjectId(String(productId)) };
        const comments = await comments_collection.find(query).toArray();

        return Promise.resolve(comments);
    }
    catch (error) {
        // TODO: log errors
        // return common error message for all type of errors
        return Promise.reject(error);
    }
    finally {
        // await client.close();
    }
}