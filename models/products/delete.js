const { ObjectId } = require('mongodb');
const connection = require('../connection');

const deleteModel = async (id) => connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }))
    .then((response) => response);

module.exports = deleteModel;