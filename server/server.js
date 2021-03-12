const express = require('express');
const fs = require('fs');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://Kavya:15is@D95@cluster0.0fcld.mongodb.net/Inventory_Management_System?retryWrites=true&w=majority';

let db;

async function connectToDb(){
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  console.log('Connected to MongoDB at',url);
  db = client.db();
}

async function getNextSequence(name)
{
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current:1 } },
    { returnOriginal: false},
  );
  return result.value.current;
}

const resolvers = {
  Query: {
    productList
  },
  Mutation: {
    productAdd
  },
};

async function productList(){
  const products = await db.collection('products').find({}).toArray();
  return products;
}

async function productAdd(_, { product }) {
  product.id = await getNextSequence('products');
  const result = await db.collection('products').insertOne(product);

  const savedProduct = await db.collection('products').findOne({ _id: result.insertedId });
  return savedProduct;
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
});

const app = express();

app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

(async function() {
  try {
    await connectToDb();
    app.listen(3000, function () {
      console.log('App started on port 3000');
    });
  }
  catch(error){
    console.log('Error:',error)
  }
})();