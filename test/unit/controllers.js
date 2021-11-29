const sinon = require('sinon');
const { expect } = require('chai');

const createProductController = require('./../../controllers/products/create');
const deleteProductController = require('../../controllers/products/delete');
const getByIdProductController = require('../../controllers/products/getById');
const listProductController = require('../../controllers/products/list');
const updateProductController = require('../../controllers/products/update');
const createSaleController = require('../../controllers/sales/create');
const deleteSaleController = require('../../controllers/sales/delete');
const getByIdSaleController = require('../../controllers/sales/getById');
const listSalesController = require('../../controllers/sales/list');
const updateSaleController = require('../../controllers/sales/update');
const createProductService = require('../../services/products/create');
const deleteProductService = require('../../services/products/delete');
const getByIdProductService = require('../../services/products/getById');
const listProductsService = require('../../services/products/list');
const updateProductService = require('../../services/products/update');
const createSaleService = require('../../services/sales/create');
const deleteSaleService = require('../../services/sales/delete');
const getByIdSaleService = require('../../services/sales/getById');
const listSalesService = require('../../services/sales/list');
const updateSaleService = require('../../services/sales/update');

describe('Teste dos controllers', () => {
  describe('Testa o controller create do banco "products"', () => {
    const newProduct = { name: 'abacaxi', quantity: 10 };
    const req = { body: '', params: '' };
    const res = { status: '', json: '' };
    const next = sinon.spy();
    const ERROR_MSG = { message: 'Erro Genérico!' };
    before(async () => {
      req.body = newProduct
      res.json = sinon.stub().returns();
      res.status = sinon.stub().returns(res);
      sinon.stub(createProductService, 'create')
        .onCall(0).throws(ERROR_MSG)
        .onCall(1).resolves(newProduct);
    });
    after(() => {
      createProductService.create.restore();
    });
    it('Valida como se comporta recebendo um erro', async () => {
      await createProductController.create(req, res, next);
      expect(next.calledOnce).to.be.true;
      expect(next.calledWith(ERROR_MSG)).to.be.true;
    });
    it('Valida como se comporta ocorrendo tudo certo', async () => {
      await createProductController.create(req, res, next);
      expect(res.status.calledOnce).to.be.true;
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });
  describe('Testa o controller delete do banco "products"', () => {
    const newProduct = { name: 'abacaxi', quantity: 10 };
    const TEST_ID = '619bb3247870c1522d239ef2';
    const req = { body: '', params: '' };
    const res = { status: '', json: '' };
    const next = sinon.spy();
    const ERROR_MSG = { message: 'Erro Genérico!' };
    before(async () => {
      req.params = TEST_ID
      res.json = sinon.stub().returns();
      res.status = sinon.stub().returns(res),
      sinon.stub(deleteProductService, 'deleteService')
        .onCall(0).throws(ERROR_MSG)
        .onCall(1).resolves(newProduct);
    });
    after(() => {
      deleteProductService.deleteService.restore();
    });
    it('Valida como se comporta recebendo um erro', async () => {
      await deleteProductController.deleteProduct(req, res, next);
      expect(next.calledOnce).to.be.true;
      expect(next.calledWith(ERROR_MSG)).to.be.true;
    });
    it('Valida como se comporta ocorrendo tudo certo', async () => {
      await deleteProductController.deleteProduct(req, res, next);
      expect(res.status.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });
  describe('Testa o controller getById do banco "products"', () => {
    const newProduct = { name: 'abacaxi', quantity: 10 };
    const TEST_ID = '619bb3247870c1522d239ef2';
    const req = { body: '', params: '' };
    const res = { status: '', json: '' };
    const next = sinon.spy();
    const ERROR_MSG = { message: 'Erro Genérico!' };
    before(async () => {
      req.params = TEST_ID
      res.json = sinon.stub().returns();
      res.status = sinon.stub().returns(res),
      sinon.stub(getByIdProductService, 'getById')
        .onCall(0).throws(ERROR_MSG)
        .onCall(1).resolves(newProduct);
    });
    after(() => {
      getByIdProductService.getById.restore();
    });
    it('Valida como se comporta recebendo um erro', async () => {
      await getByIdProductController.getById(req, res, next);
      expect(next.calledOnce).to.be.true;
      expect(next.calledWith(ERROR_MSG)).to.be.true;
    });
    it('Valida como se comporta ocorrendo tudo certo', async () => {
      await getByIdProductController.getById(req, res, next);
      expect(res.status.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });
  describe('Testa o controller list do banco "products"', () => {
    const res = { status: '', json: '' };
    const next = sinon.spy();
    const ERROR_MSG = { message: 'Erro Genérico!' };
    before(async () => {
      res.json = sinon.stub().returns();
      res.status = sinon.stub().returns(res),
      sinon.stub(listProductsService, 'list')
        .onCall(0).throws(ERROR_MSG)
        .onCall(1).resolves({products: [{ name: 'abacaxi', quantity: 10 }] });
    });
    after(() => {
      listProductsService.list.restore();
    });
    it('Valida como se comporta recebendo um erro', async () => {
      await listProductController.list('nada', res, next);
      expect(next.calledOnce).to.be.true;
      expect(next.calledWith(ERROR_MSG)).to.be.true;
    });
    it('Valida como se comporta ocorrendo tudo certo', async () => {
      await listProductController.list('nada', res, next);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });
  describe('Testa o controller update do banco "products"', () => {
    const newProduct = { name: 'abacaxi', quantity: 10 };
    const TEST_ID = '619bb3247870c1522d239ef2';
    const req = { body: '', params: '' };
    const res = { status: '', json: '' };
    const next = sinon.spy();
    const ERROR_MSG = { message: 'Erro Genérico!' };
    before(async () => {
      req.body = newProduct;
      req.params = TEST_ID;
      res.json = sinon.stub().returns();
      res.status = sinon.stub().returns(res);
      sinon.stub(updateProductService, 'update')
        .onCall(0).throws(ERROR_MSG)
        .onCall(1).resolves(newProduct);
    });
    after(() => {
      updateProductService.update.restore();
    });
    it('Valida como se comporta recebendo um erro', async () => {
      await updateProductController.update(req, res, next);
      expect(next.calledOnce).to.be.true;
      expect(next.calledWith(ERROR_MSG)).to.be.true;
    });
    it('Valida como se comporta ocorrendo tudo certo', async () => {
      await updateProductController.update(req, res, next);
      expect(res.status.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });
  describe('Testa o controller create do banco "sales"', () => {
    const newProduct = { name: 'abacaxi', quantity: 10 };
    const req = { body: '', params: '' };
    const res = { status: '', json: '' };
    const next = sinon.spy();
    const ERROR_MSG = { message: 'Erro Genérico!' };
    before(async () => {
      req.body = newProduct
      res.json = sinon.stub().returns();
      res.status = sinon.stub().returns(res);
      sinon.stub(createSaleService, 'create')
        .onCall(0).throws(ERROR_MSG)
        .onCall(1).resolves(newProduct);
    });
    after(() => {
      createSaleService.create.restore();
    });
    it('Valida como se comporta recebendo um erro', async () => {
      await createSaleController.create(req, res, next);
      expect(next.calledOnce).to.be.true;
      expect(next.calledWith(ERROR_MSG)).to.be.true;
    });
    it('Valida como se comporta ocorrendo tudo certo', async () => {
      await createSaleController.create(req, res, next);
      expect(res.status.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });
  describe('Testa o controller delete do banco "sales"', () => {
    const newProduct = { name: 'abacaxi', quantity: 10 };
    const TEST_ID = '619bb3247870c1522d239ef2';
    const req = { body: '', params: '' };
    const res = { status: '', json: '' };
    const next = sinon.spy();
    const ERROR_MSG = { message: 'Erro Genérico!' };
    before(async () => {
      req.params = TEST_ID
      res.json = sinon.stub().returns();
      res.status = sinon.stub().returns(res),
      sinon.stub(deleteSaleService, 'remove')
        .onCall(0).throws(ERROR_MSG)
        .onCall(1).resolves(newProduct);
    });
    after(() => {
      deleteSaleService.remove.restore();
    });
    it('Valida como se comporta recebendo um erro', async () => {
      await deleteSaleController.remove(req, res, next);
      expect(next.calledOnce).to.be.true;
      expect(next.calledWith(ERROR_MSG)).to.be.true;
    });
    it('Valida como se comporta ocorrendo tudo certo', async () => {
      await deleteSaleController.remove(req, res, next);
      expect(res.status.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });
  describe('Testa o controller getById do banco "sales"', () => {
    const newProduct = { name: 'abacaxi', quantity: 10 };
    const TEST_ID = '619bb3247870c1522d239ef2';
    const req = { body: '', params: '' };
    const res = { status: '', json: '' };
    const next = sinon.spy();
    const ERROR_MSG = { message: 'Erro Genérico!' };
    before(async () => {
      req.params = TEST_ID
      res.json = sinon.stub().returns();
      res.status = sinon.stub().returns(res),
      sinon.stub(getByIdSaleService, 'getById')
        .onCall(0).throws(ERROR_MSG)
        .onCall(1).resolves(newProduct);
    });
    after(() => {
      getByIdSaleService.getById.restore();
    });
    it('Valida como se comporta recebendo um erro', async () => {
      await getByIdSaleController.getById(req, res, next);
      expect(next.calledOnce).to.be.true;
      expect(next.calledWith(ERROR_MSG)).to.be.true;
    });
    it('Valida como se comporta ocorrendo tudo certo', async () => {
      await getByIdSaleController.getById(req, res, next);
      expect(res.status.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });
  describe('Testa o controller list do banco "sales"', () => {
    const res = { status: '', json: '' };
    const next = sinon.spy();
    const ERROR_MSG = { message: 'Erro Genérico!' };
    before(async () => {
      res.json = sinon.stub().returns();
      res.status = sinon.stub().returns(res),
      sinon.stub(listSalesService, 'list')
        .onCall(0).throws(ERROR_MSG)
        .onCall(1).resolves({products: [{ name: 'abacaxi', quantity: 10 }] });
    });
    after(() => {
      listSalesService.list.restore();
    });
    it('Valida como se comporta recebendo um erro', async () => {
      await listSalesController.list('nada', res, next);
      expect(next.calledOnce).to.be.true;
      expect(next.calledWith(ERROR_MSG)).to.be.true;
    });
    it('Valida como se comporta ocorrendo tudo certo', async () => {
      await listSalesController.list('nada', res, next);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });
  describe('Testa o controller update do banco "sales"', () => {
    const newProduct = { name: 'abacaxi', quantity: 10 };
    const TEST_ID = '619bb3247870c1522d239ef2';
    const req = { body: '', params: '' };
    const res = { status: '', json: '' };
    const next = sinon.spy();
    const ERROR_MSG = { message: 'Erro Genérico!' };
    before(async () => {
      req.body = newProduct;
      req.params = TEST_ID;
      res.json = sinon.stub().returns();
      res.status = sinon.stub().returns(res);
      sinon.stub(updateSaleService, 'update')
        .onCall(0).throws(ERROR_MSG)
        .onCall(1).resolves(newProduct);
    });
    after(() => {
      updateSaleService.update.restore();
    });
    it('Valida como se comporta recebendo um erro', async () => {
      await updateSaleController.update(req, res, next);
      expect(next.calledOnce).to.be.true;
      expect(next.calledWith(ERROR_MSG)).to.be.true;
    });
    it('Valida como se comporta ocorrendo tudo certo', async () => {
      await updateSaleController.update(req, res, next);
      expect(res.status.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });
});