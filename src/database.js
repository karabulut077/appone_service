
require('dotenv').config();

const { MongoClient, ObjectId } = require("mongodb");
const uri = process.env.MONGODB_ATLAS_CONNECTION_STRING;
const db_name = process.env.DB_NAME;
const products_collection_name = process.env.COLLECTION_NAME_OF_PRODUCTS;
const comments_collection_name = process.env.COLLECTION_NAME_OF_COMMENTS;
const stores_collection_name = process.env.COLLECTION_NAME_OF_STORES;
const stocks_collection_name = process.env.COLLECTION_NAME_OF_STOCKS;
const client = new MongoClient(uri);

let isConnected = false;

/*
    TODO: log errors
    TODO: return common error message for all type of errors
*/
exports.getProductById = async function (productId) {
    if (!isConnected) {
        await client.connect();
        isConnected = true;
    }

    try {
        const database = client.db(db_name);
        const products_collection = database.collection(products_collection_name);

        const query = { _id: new ObjectId(String(productId)) };
        const projection = {
            _id: 1,
            name: 1,
            brand_id: 1,
            images: 1,
            stores: 1,
            total_sale_count: 1
        };
        const product = await products_collection
            .findOne(query, { projection: projection });

        return Promise.resolve(product);
    }
    catch (error) {
        return Promise.reject(error);
    }
    finally {

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
        const products = await products_collection
            .find(query)
            .toArray();

        return Promise.resolve(products);
    }
    catch (error) {
        return Promise.reject(error);
    }
    finally {

    }
}

exports.getBestSellerProducts = async function (count) {
    if (!isConnected) {
        await client.connect();
        isConnected = true;
    }

    try {
        const database = client.db(db_name);
        const products_collection = database.collection(products_collection_name);

        const products = await products_collection
            .find({ total_sale_count: { $gt: 0 } })
            .sort({ total_sale_count: -1 })
            .limit(Number(count))
            .toArray();
        return Promise.resolve(products);
    }
    catch (error) {
        return Promise.reject(error);
    }
    finally {

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
        const comments = await comments_collection
            .find(query)
            .toArray();

        return Promise.resolve(comments);
    }
    catch (error) {
        return Promise.reject(error);
    }
    finally {

    }
}

exports.getDetailsByProductId = async function (productId) {
    if (!isConnected) {
        await client.connect();
        isConnected = true;
    }

    try {
        const database = client.db(db_name);

        // products
        const products_collection = database.collection(products_collection_name);
        const query_pr = { _id: new ObjectId(String(productId)) };
        const projection_pr = {
            _id: 1,
            name: 1,
            brand_id: 1,
            brand_name: 1,
            images: 1,
            stores: 1
        };
        const product = await products_collection
            .findOne(query_pr, { projection: projection_pr });

        // stores
        /*
            şimdilik ilk mağazayı alıyoruz
            ileride bu ürünü en çok satan mağaza getirilecek
        */
        const store_id = product.stores[0];
        const stores_collection = database.collection(stores_collection_name);
        const query_st = { _id: new ObjectId(String(store_id)) };
        const projection_st = {
            _id: 1,
            name: 1
        };
        const store = await stores_collection
            .findOne(query_st, { projection: projection_st });

        // stocks
        const stocks_collection = database.collection(stocks_collection_name);
        const query_sto = { product_id: new ObjectId(String(productId)) };
        const projection_sto = {
            _id: 1,
            product_id: 1,
            stores: {
                $elemMatch: { store_id: new ObjectId(String(store_id)) }
            }
        };
        const stock = await stocks_collection
            .findOne(query_sto, { projection: projection_sto });
        const stock_of_store = stock.stores[0];

        // microservices ??
        const detail = {
            product_id: product._id,
            product_name: product.name,
            brand_id: product.brand_id,
            brand_name: product.brand_name,
            images: product.images,
            store_id: store._id,
            store_name: store.name,
            stock_id: stock._id,
            quantity: stock_of_store.quantity,
            price: stock_of_store.price
        };

        return Promise.resolve(detail);
    }
    catch (error) {
        return Promise.reject(error);
    }
    finally {

    }
}