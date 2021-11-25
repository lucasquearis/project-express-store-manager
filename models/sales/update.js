const { ObjectId } = require('mongodb');
const connection = require('../connection');

const update = async (productId, quantity, id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) => db.collection('sales').updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold: [
            productId,
            quantity,
          ],
        },
      },
    )).then((response) => response);
};

module.exports = update;