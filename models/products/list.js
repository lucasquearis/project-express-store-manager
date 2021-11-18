const connection = require('../connection');

const list = async () => {
  const products = await connection()
    .then((db) => db.collection('products').find().toArray);
  return products;
};

module.exports = list;
