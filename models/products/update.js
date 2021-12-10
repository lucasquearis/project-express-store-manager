const { ObjectId } = require('mongodb');
const connection = require('../connection');

const update = async (name, quantity, id) => connection()
    .then((db) => db.collection('products').updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          name,
          quantity,
        },
      },
    ))
    .then((result) => result);

module.exports = { update };