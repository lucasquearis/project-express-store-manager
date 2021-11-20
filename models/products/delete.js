const { ObjectId } = require('mongodb');
const connection = require('../connection');

const deleteModel = async (param) => {
  const { _id, name, quantity } = param;
  return connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(_id) }))
    .then((_response) => ({ _id, name, quantity }));
};

module.exports = deleteModel;