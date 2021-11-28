const express = require('express');
const middlewareError = require('./controllers/ErrorController');
const productsRoutes = require('./routes/products');
const salesRouter = require('./routes/sales');

const app = express();

app.use(express.json());

app.use('/products', productsRoutes.productsRouter);
app.use('/sales', salesRouter.salesRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(middlewareError.errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`online na porta ${PORT}`));