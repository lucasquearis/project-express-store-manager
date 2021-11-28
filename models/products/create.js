const connection = require('../connection');

const create = (name, quantity) => connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(({ ops }) => {
        const [firstElement] = ops;
        return firstElement;
    });

module.exports = { create };
