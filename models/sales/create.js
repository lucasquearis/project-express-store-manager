const connection = require('../connection');

const create = async (body) => connection()
    .then((db) => db.collection('sales').insertOne(
      {
        itensSold: [
          ...body,
        ],
      },
    ))
    .then(({ ops }) => {
      const [firstElement] = ops;
      return firstElement;
    });

module.exports = create;