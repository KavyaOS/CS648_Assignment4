/* eslint linebreak-style: ["error","windows"] */
/* global db print */
/* eslint no-restricted-globals: "off" */
db.products.remove({});

const productsDB = [];

db.products.insertMany(productsDB);
const count = db.products.count();
print('Inserted', count, 'products');

db.counters.remove({ _id: 'products' });
db.counters.insert({ _id: 'products', current: count });

db.products.createIndex({ id: 1 }, { unique: true });
db.products.createIndex({ category: 1 });
db.products.createIndex({ name: 1 });
db.products.createIndex({ price: 1 });
db.products.createIndex({ imageurl: 1 });
