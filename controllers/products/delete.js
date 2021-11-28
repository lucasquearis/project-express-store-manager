const serviceDelete = require('../../services/products/delete');

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const verifyProduct = await serviceDelete.deleteService(id);
    res.status(200).json(verifyProduct);
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteProduct };