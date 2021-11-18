const express = require('express');
const middlewareError = require('./controllers/ErrorController');
const productsRoutes = require('./routes/products');

const app = express();

app.use(express.json());

app.use('/products', productsRoutes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(middlewareError);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => `online na porta ${PORT}`);