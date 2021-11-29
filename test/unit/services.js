const sinon = require('sinon');
const { expect } = require('chai');

const createProductModel = require('../../models/products/create');
const getByNameProductModel = require('../../models/products/getByName');
const getByIdProductModel = require('../../models/products/getById');
const deleteProductModel = require('../../models/products/delete');
const listProductsModel = require('../../models/products/list');
const updateProductModel = require('../../models/products/update');
const createSaleModel = require('../../models/sales/create');
const updateQuantityProduct = require('../../models/products/updateQuantity');
const deleteSaleModel = require('../../models/sales/delete');
const getByIdSaleModel = require('../../models/sales/getById');
const listSalesModel = require('../../models/sales/list');
const createProductService = require('../../services/products/create');
const deleteProductService = require('../../services/products/delete');
const getByIdProductService = require('../../services/products/getById');
const listProductsService = require('../../services/products/list');
const updateProductsService = require('../../services/products/update');
const createSaleService = require('../../services/sales/create');
const deleteSaleService = require('../../services/sales/delete');
const deleteSalesHelper = require('../../services/sales/deleteHelper');
const getByIdSaleService = require('../../services/sales/getById');
const listSalesService = require('../../services/sales/list');
const updateSaleService = require('../../services/sales/update');
const updateQuantityHelper = require('../../services/sales/updateHelper');

const TEST_ID = '619bb3247870c1522d239ef2';
const TEST_ID_TWO = '619bb3247870c1522d239ef7';

describe('Teste dos Services', () => {
  describe('Testa o service create do banco "products"', () => {
    before(async () => {
      sinon.stub(getByNameProductModel, 'getByName')
      .onCall(0).resolves({ _id: TEST_ID, name: 'banana', quantity: 7})
      .onCall(1).resolves(null);
      sinon.stub(createProductModel, 'create').resolves({ _id: TEST_ID, name: 'goiabada', quantity: 10 });
    });
  
    after(() => {
      createProductModel.create.restore();
      getByNameProductModel.getByName.restore();
    });
    it('Verifica se adiciona produtos repetidos', async () => {
      let error;
      try {
        await createProductService.create('banana', 10);
      } catch (err) {
        error = err;
      };
      expect(error.code).to.be.equal('invalid_data');
      expect(error.message).to.be.equal('Product already exists');
    });
    it('Verifica se cria produto corretamente', async () => {
      const objectResult = { _id: TEST_ID, name: 'goiabada', quantity: 10 };
      const result = await createProductService.create('goiabada', 10);
      expect(result._id).to.be.equal(objectResult._id);
      expect(result.name).to.be.equal(objectResult.name);
      expect(result.quantity).to.be.equal(objectResult.quantity);
    });
    it('Verifica se retorna um erro ao adicionar produto com nome inválido', async () => {
      let error;
      try {
        await createProductService.create('ba', 10);
      } catch (err) {
        error = err
      };
      expect(error.message).to.be.equal('"name" length must be at least 5 characters long');
    });
    it('Verifica se retorna um erro ao adicionar produto com quantidade inválida', async () => {
      let error;
      try {
        await createProductService.create('abacaxi', -1);
      } catch (err) {
        error = err
      };
      expect(error.message).to.be.equal('"quantity" must be greater than or equal to 1');
    })
  });
  describe('Testa o service delete do banco "products"', () => {
    before(async() => {
      sinon.stub(getByIdProductModel, 'getById')
        .onCall(0).resolves(null)
        .onCall(1).resolves({ _id: TEST_ID, name: 'batata', quantity: 10 });
      sinon.stub(deleteProductModel, 'deleteModel').resolves({});
    });
    after(() => {
      getByIdProductModel.getById.restore();
      deleteProductModel.deleteModel.restore();
    });
    it('Verifica tentativa de delete em produto inexistente', async () => {
      let error;
      try {
        await deleteProductService.deleteService(TEST_ID);
      } catch (err) {
        error = err;
      }
      expect(error.code).to.be.equal('invalid_data');
      expect(error.message).to.be.equal('Wrong id format');
    })
    it('Verifica se a função delete funciona corretamente', async () => {
      const result = await deleteProductService.deleteService(TEST_ID);
      expect(result._id).to.be.equal(TEST_ID);
      expect(result.name).to.be.equal('batata');
      expect(result.quantity).to.be.equal(10);
    });
  });
  describe('Testa o service getById do banco "products"', () => {
    before(async () => {
      sinon.stub(getByIdProductModel, 'getById')
        .onCall(0).resolves(null)
        .onCall(1).resolves({ _id: TEST_ID, name: 'maçã', quantity: 10 })
    });
    after(() => {
      getByIdProductModel.getById.restore();
    });
    it('Verifica a função recebendo um id inválido', async () => {
      let error;
      try {
        result = await getByIdProductService.getById(11111);
      } catch (err) {
        error = err;
      }
      expect(error.code).to.be.equal('invalid_data');
      expect(error.message).to.be.equal('Wrong id format');
    });
    it('Verifica a função recebendo um id válido', async () => {
      const result = await getByIdProductService.getById(TEST_ID);
      expect(result._id).to.be.equal(TEST_ID);
      expect(result.name).to.be.equal('maçã');
      expect(result.quantity).to.be.equal(10);
    });
  });
  describe('Testa o service list do banco "products"', () => {
    before(() => {
      sinon.stub(listProductsModel, 'list').resolves([{_id: '1234', name: 'mamão', quantity: 10}, {_id: '4321', name: 'limão', quantity: 15}]);
    });
    after(() => {
      listProductsModel.list.restore();
    });
    it('Verifica se os produtos listados retorna um objeto', async () => {
      const result = await listProductsService.list();
      expect(result).to.be.a('object');
    });
    it('Verifica se o retorno da função list contem uma chave "products" e essa chave é uma array', async () => {
      const result = await listProductsService.list();
      expect(result).to.have.deep.all.keys('products');
      expect(result.products).to.be.a('array');
    });
  });
  describe('Testa o service update do banco "products"', () => {
    before(async () => {
      sinon.stub(getByNameProductModel, 'getByName')
        .onCall(0).resolves({ name: 'bicicleta' })
        .onCall(1).resolves(null);
      sinon.stub(updateProductModel, 'update').resolves('deu boa!')
    });
    after(() => {
      getByNameProductModel.getByName.restore();
      updateProductModel.update.restore();
    });
    it('Verifica se retorna um erro inserindo nome inválido', async () => {
      let error;
      try {
        await updateProductsService.update('gira', 10, TEST_ID);
      } catch (err) {
        error = err;
      }
      expect(error.message).to.be.equal('"name" length must be at least 5 characters long');
    });
    it('Verifica se retorna um erro inserindo uma quantidade inválida', async () => {
      let error;
      try {
        await updateProductsService.update('girassol', -1, TEST_ID);
      } catch (err) {
        error = err;
      }
      expect(error.message).to.be.equal('"quantity" must be greater than or equal to 1');
    });
    it('Verifica se ao tentar colocar um nome de produto existente, ele lança um erro', async () => {
      let error;
      try {
        await updateProductsService.update('bicicleta', 2, TEST_ID);
      } catch (err) {
        error = err;
      };
      expect(error.code).to.be.equal('invalid_data');
      expect(error.message).to.be.equal('Product already exists');
    });
    it('Verifica se a função atualiza um produto', async () => {
      const response = await updateProductsService.update('melão', 12, TEST_ID);
      expect(response._id).to.be.equal(TEST_ID);
      expect(response.name).to.be.equal('melão');
      expect(response.quantity).to.be.equal(12);
    });
  });
  describe('Testa o service create do banco "sales"', () => {
    before(async () => {
      sinon.stub(getByIdProductModel, 'getById').resolves({ _id: TEST_ID, name: 'maçã', quantity: 100 })
      sinon.stub(createSaleModel, 'create')
        .onCall(0).resolves({ itensSold: [{productId: TEST_ID, quantity: 12}] })
        .onCall(1).resolves({ itensSold: [{productId: TEST_ID, quantity: 12}, {productId: TEST_ID_TWO, quantity: 24}] });
      sinon.stub(updateQuantityProduct, 'updateQuantity').resolves(1)
    });
    after(() => {
      getByIdProductModel.getById.restore();
      createSaleModel.create.restore();
      updateQuantityProduct.updateQuantity.restore();
    });
    it('Verifica se retorna um erro ao inserir um produto com quantidade inválida', async () => {
      let error;
      try {
        await createSaleService.create([{productId: TEST_ID, quantity: -2}]); 
      } catch (err) {
        error = err;
      };
      expect(error.message).to.be.equal('Wrong product ID or invalid quantity');
    });
    it('Verifica se realiza UMA venda com sucesso', async () => {
      const result = await createSaleService.create([{productId: TEST_ID, quantity: 12}]);
      expect(result).to.be.a('object');
      expect(result.itensSold).to.be.a('array');
      expect(result.itensSold).to.have.length(1);
      expect(result.itensSold[0]).to.have.all.deep.keys('productId', 'quantity');
    });
    it('Verifica se realiza mais de uma venda com sucesso', async () => {
      const result = await createSaleService.create([{productId: TEST_ID, quantity: 12}, {productId: TEST_ID_TWO, quantity: 24}]);
      expect(result).to.be.a('object');
      expect(result).to.have.all.deep.keys('itensSold');
      expect(result.itensSold).to.be.a('array');
      expect(result.itensSold).to.have.length(2);
      expect(result.itensSold[0]).to.have.all.deep.keys('productId', 'quantity');
      expect(result.itensSold[0].productId).to.be.equal(TEST_ID);
      expect(result.itensSold[0].quantity).to.be.equal(12);
      expect(result.itensSold[1]).to.have.all.deep.keys('productId', 'quantity');
      expect(result.itensSold[1].productId).to.be.equal(TEST_ID_TWO);
      expect(result.itensSold[1].quantity).to.be.equal(24);

    })
  });
  describe('Testa o service delete no banco "sales"', () => {
    before(async () => {
      sinon.stub(deleteSaleModel, 'remove').resolves({ message: 'delete successfully' });
      sinon.stub(deleteSalesHelper, 'updateQuantity').resolves('ok');
    });
    after(() => {
      deleteSaleModel.remove.restore();
      deleteSalesHelper.updateQuantity.restore();
    });
    it('Verifica se é possivel deletar uma venda inexistente', async () => {
      let error;
      try {
        await deleteSaleService.remove('111');
      } catch (err) {
        error = err;
      }
      expect(error.code).to.be.equal('invalid_data');
      expect(error.message).to.be.equal('Wrong sale ID format');
    });
    it('Verifica se o produto é deletado', async () => {
      const result = await deleteSaleService.remove(TEST_ID);
      expect(result).to.be.a('object');
      expect(result.message).to.be.equal('delete successfully');
    });
  });
  describe('Testa o service getById no banco "sales"', () => {
    before(async () => {
      sinon.stub(getByIdSaleModel, 'getById')
        .onCall(0).resolves(null)
        .onCall(1).resolves({ _id: TEST_ID, itensSold: [] })
    });
    after(() => {
      getByIdSaleModel.getById.restore();
    });
    it('Verifica se ele retorna um erro inserindo id inválido', async () => {
      let error;
      try {
        await getByIdSaleService.getById('1111');
      } catch (err) {
        error = err;
      }
      expect(error).to.be.a('object');
      expect(error.code).to.be.equal('not_found');
      expect(error.message).to.be.equal('Sale not found');
    });
    it('Verifica se a função nos entrega uma venda válida', async () => {
      const result = await getByIdSaleService.getById(TEST_ID);
      expect(result).to.be.a('object');
      expect(result).to.have.all.deep.keys('_id', 'itensSold');
      expect(result._id).to.be.equal(TEST_ID);
      expect(result.itensSold).to.be.a('array');
      expect(result.itensSold).to.be.empty;
    });
  });
  describe('Testa o service list no banco "sales"', () => {
    before(async () => {
      sinon.stub(listSalesModel, 'list').resolves([{ productId: TEST_ID, quantity: 10 }, { productId: TEST_ID_TWO, quantity: 12 }]);
    });
    after(() => {
      listSalesModel.list.restore();
    });
    it('Verifica se o service list retorna todas as vendas no formato correto', async () => {
      const result = await listSalesService.list();
      expect(result).to.be.a('object');
      expect(result).to.have.all.deep.keys('sales');
      expect(result.sales).to.be.a('array');
      expect(result.sales).to.have.length(2);
    });
  });
  describe('Testa o service update no banco "sales"', () => {
    before(() => {
      sinon.stub(updateQuantityHelper, 'verifyQuantityProduct').resolves({ productId: TEST_ID, quantity: 10 });
      sinon.stub(updateQuantityHelper, 'formatResult').resolves({ _id: TEST_ID_TWO, itensSold: [{ productId: TEST_ID, quantity: 10 }] })
    });
    after(() => {
      updateQuantityHelper.verifyQuantityProduct.restore();
    });
    it('Verifica se retorna um erro, inserindo um produto com quantity inválida', async () => {
      let error;
      try {
        await updateSaleService.update([{ productId: TEST_ID, quantity: -1 }]);
      } catch (err) {
        error = err;
      };
      expect(error.message).to.be.equal('Wrong product ID or invalid quantity');
    });
    it('Verifica se a venda com um produto é atualizada com sucesso',  async () => {
      const response = await updateSaleService.update([{ productId: TEST_ID, quantity: 10 }], TEST_ID_TWO);
      expect(response).to.be.a('object');
      expect(response).to.have.all.deep.keys('_id', 'itensSold');
      expect(response._id).to.be.equal(TEST_ID_TWO);
      expect(response.itensSold).to.be.a('array');
    });
  })
});