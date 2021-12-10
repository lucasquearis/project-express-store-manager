const { ObjectId } = require('mongodb');
const connection = require('../connection');

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)))
    .then((response) => response);
};

module.exports = { getById };