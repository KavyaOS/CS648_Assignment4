/* eslint linebreak-style: ["error","windows"] */

const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('./db.js');

async function list() {
  const db = getDb();
  const products = await db.collection('products').find({}).toArray();
  return products;
}

function validate(product) {
  const errors = [];
  if (product.category === null) errors.push('Category not selected');
  if (product.name === null) errors.push('Product name not entered');
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

async function add(_, { product }) {
  const db = getDb();
  validate(product);
  const newProduct = { ...product };
  newProduct.id = await getNextSequence('products');
  const result = await db.collection('products').insertOne(newProduct);

  const savedProduct = await db.collection('products').findOne({ _id: result.insertedId });
  return savedProduct;
}

module.exports = { list, add };
