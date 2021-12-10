const connection = require('../connection');

const getByName = (name) => connection()
    .then((db) => db.collection('products').findOne({ name }))
    .then((result) => result);

module.exports = { getByName };
