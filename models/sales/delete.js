const { ObjectId } = require('mongodb');
const connection = require('../connection');

const remove = async (id) => connection()
    .then((db) => db.collection('sales').deleteOne(
      {
        _id: ObjectId(id),
      },
    ))
    .then((_response) => ({ message: 'delete successfully' }));

module.exports = { remove };
