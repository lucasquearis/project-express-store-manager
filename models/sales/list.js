const connection = require('../connection');

const list = async () => connection()
    .then((db) => db.collection('sales').find().toArray())
    .then((response) => ({
            sales: [
                ...response,
            ],
        }));

module.exports = list;