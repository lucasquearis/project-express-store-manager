const connection = require('../connection');

const getByName = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ name }))
    .then((result) => result);
  return product;
};

module.exports = getByName;
