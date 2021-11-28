const sinon = require('sinon');
const { expect } = require('chai');

const createProductModel = require('../../models/products/create');
const getByNameProductModel = require('../../models/products/getByName');
const getByIdProductModel = require('../../models/products/getById');
const deleteProductModel = require('../../models/products/delete');
const listProductsModel = require('../../models/products/list');
const updateProductModel = require('../../models/products/update');
const createProductService = require('../../services/products/create');
const deleteProductService = require('../../services/products/delete');
const getByIdProductService = require('../../services/products/getById');
const listProductsService = require('../../services/products/list');
const updateProductsService = require('../../services/products/update');

const TEST_ID = '619bb3247870c1522d239ef2'

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
  describe('Testa o service update do bando "products"', () => {
    before(async () => {
      sinon.stub(getByNameProductModel, 'getByName')
        .onCall(0).resolves({ name: 'bicicleta' })
        .onCall(1).resolves(null);
      sinon.stub(updateProductModel, 'update').resolves('deu boa!')
    });
    after(() => {

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
});