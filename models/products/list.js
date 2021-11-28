const connection = require('../connection');

const list = async () => connection()
    .then((db) => db.collection('products').find().toArray());

module.exports = { list };
