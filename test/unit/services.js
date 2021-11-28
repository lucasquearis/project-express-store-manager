const sinon = require('sinon');
const { expect } = require('chai');

const createProductModel = require('../../models/products/create');
const createProductService = require('../../services/products/create');

describe('Teste dos Services', () => {
  describe('Testa o service create do banco "create"', () => {
    before(async () => {
      sinon.stub().resolves({})
    });
  
    after(async () => {
      connection.restore();
    });
    it('Verifica retorno Model', async () => {
      const result = await createProductService('lucas', 10);
      console.log(result);
    })
  });
});