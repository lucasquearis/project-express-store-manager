const { ObjectId } = require('mongodb');
const connection = require('../connection');

const updateQuantity = async (id, quantity) => connection()
    .then((db) => db.collection('products').updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          quantity,
        },
      },
    ))
    .then((result) => result);

module.exports = updateQuantity;