/* eslint linebreak-style: ["error","windows"] */
/* eslint no-restricted-globals: "off" */
const express = require('express');
const fs = require('fs');
require('dotenv').config();
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { MongoClient } = require('mongodb');

const url = process.env.DB_URL || 'mongodb+srv://Kavya:15is@D95@cluster0.0fcld.mongodb.net/Inventory_Management_System?retryWrites=true&w=majority';
const port = process.env.API_SERVER_PORT || 3000;
let db;

async function connectToDb() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

async function getNextSequence(name) {
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } },
    { returnOriginal: false },
  );
  return result.value.current;
}

async function productList() {
  const products = await db.collection('products').find({}).toArray();
  return products;
}

function productValidate(product)
{
  const errors = [];
  if(product.category === null ) errors.push('Category not selected');
  if(product.name === null ) errors.push('Product name not entered');
  if(errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors } );
  }
}

async function productAdd(_, { product }) {
  productValidate(product);
  const newProduct = { ...product };
  newProduct.id = await getNextSequence('products');
  const result = await db.collection('products').insertOne(newProduct);

  const savedProduct = await db.collection('products').findOne({ _id: result.insertedId });
  return savedProduct;
}

const resolvers = {
  Query: {
    productList,
  },
  Mutation: {
    productAdd,
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

const app = express();
const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
console.log('CORS setting ', enableCors);
server.applyMiddleware({ app, path: '/graphql', cors: enableCors });

(async function start() {
  try {
    await connectToDb();
    app.listen(port, () => {
      console.log(`API server started on port ${port}`);
    });
  } catch (error) {
    console.log('Error:', error);
  }
}());
