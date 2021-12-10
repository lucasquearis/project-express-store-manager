const { ObjectId } = require('mongodb');
const connection = require('../connection');

const getById = (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)))
    .then((response) => response);
};

module.exports = { getById };