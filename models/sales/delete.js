const { ObjectId } = require('mongodb');
const connection = require('../connection');

const remove = async (id) => {
  console.log(id);
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('sales').deleteOne(
      {
        _id: ObjectId(id),
      },
    ))
    .then((respose) => respose);
};

module.exports = remove;
