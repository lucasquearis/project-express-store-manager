const serviceUpdate = require('../../services/products/update');

const update = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const updateProduct = await serviceUpdate(name, quantity, id);
    res.status(200).json(updateProduct);
  } catch (error) {
    next(error);
  }
};

module.exports = update;