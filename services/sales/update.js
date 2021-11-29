const updateHelper = require('./updateHelper');

const update = async (body, id) => {
  const errorParams = updateHelper.validateParams(body);
  if (errorParams) throw errorParams;
  const mapBody = body.map(async ({ productId, quantity }) => {
    const validQuantityProduct = await updateHelper.verifyQuantityProduct(productId, quantity);
    return validQuantityProduct;
  });
  const resolveMap = await Promise.all(mapBody);
  if (resolveMap.includes(null)) {
    return {
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
        },
      };
  }
  return updateHelper.formatResult(resolveMap, id);
};

module.exports = { update };