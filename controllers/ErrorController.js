module.exports = (err, req, res, _next) => {
  if (err.isJoi) {
    return res.status(422)
    .json({ err: { code: 'invalid_data',
    message: err.details[0].message
      .replace('greater', 'larger') } });
  }
  let status = 500;
  if (err.code === 'invalid_data') status = 422;
  if (err.code === 'not_found' || err.code === 'stock_problem') status = 404;
  res.status(status).json({ err });
};