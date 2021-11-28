const { expect } = require('chai');
const sinon = require('sinon');
const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const createProductModel = require('../../models/products/create');
const listProductsModel = require('../../models/products/list');
const updateProductsModel = require('../../models/products/update');
const getByNameProductModel = require('../../models/products/getByName');
const deleteProductModel = require('../../models/products/delete');
const getByIdProductModel = require('../../models/products/getById');
const updateQuantityProductModel = require('../../models/products/updateQuantity');
const createSaleModel = require('../../models/sales/create');
const listSalesModel = require('../../models/sales/list');
const deleteSaleModel = require('../../models/sales/delete');
const getByIdSaleModel = require('../../models/sales/getById');
const updateSaleModel = require('../../models/sales/update');

describe('Testes do model', () => {
  const DBServer = new MongoMemoryServer();

    before(async () => {
      const mockURL = await DBServer.getUri();
      const mockConnection = await MongoClient.connect(
        mockURL,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      sinon.stub(MongoClient, 'connect').resolves(mockConnection);
    });
  
    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });
  describe('Testa o model create no banco "products"', () => {
    it('Verifica se o produto adicionado retorna um objeto', async () => {
      const response = await createProductModel.create('banana', 10);
      expect(response).to.be.a('object');
    });
    it('Verifica se o ID do produto adicionado é válido', async () => {
      const response = await createProductModel.create('abacate', 20);
      expect(ObjectId.isValid(response._id)).to.be.true;
    });
    it('Insere um novo produto', async () => {
      const response = await createProductModel.create('melancia', 15);
      expect(response).to.include.keys('_id', 'name', 'quantity');
    });
    it('Verifica se o produto foi realmente adicionado', async () => {
      const result = await listProductsModel.list();
      const [firstElement] = result;
      expect(firstElement.name).to.equal('banana');
      expect(firstElement.quantity).to.equal(10);
    });
  });
  describe('Testa o model list no banco "products"', () => {
    it('Verifica se o retorno é uma array', async () => {
      const products = await listProductsModel.list();
      console.log(products);
      expect(products).to.be.a('array');
    })
    it('Verifica se lista todos os produtos', async () => {
      const result = await listProductsModel.list();
      expect(result).to.be.a('array')
      expect(result).to.have.length(3);
    });
  });
  describe('Testa o model update no banco "products"', () => {
    
    it('Verifica se o produto é atualizado', async () => {
      const newProduct = await createProductModel.create('GOIABDA', 100);
      await updateProductsModel.update('GOIABADA', 100, newProduct._id);
      const resultUpdated = await getByNameProductModel.getByName('GOIABADA');
      expect(resultUpdated).to.have.deep.keys('_id', 'name', 'quantity');
      expect(resultUpdated.name).to.equal('GOIABADA');
    })
  });
  describe('Testa o model delete no banco "products"', () => {
    it('Verifica se o produto é deletado corretamente', async () => {
      const listProducts = async () => await listProductsModel.list();
      const products = await listProducts();
      const idGoiabada = products[3]._id;
      await deleteProductModel.deleteModel(idGoiabada);
      const getProductById = await getByIdProductModel.getById(idGoiabada);
      expect(getProductById).to.be.null;
    })
  });
  describe('Testa o model getById no banco "products', () => {
    it('Verifica se informando um id invalido ele retorna null', async () => {
      const verifyProductId = await getByIdProductModel.getById('111');
      expect(verifyProductId).to.be.null;
    })
    it('Verifica se o model getById nos entrega o objeto correto', async () => {
      const products = await listProductsModel.list();
      const idAbacate = await products[1]._id
      const { name, quantity } = await getByIdProductModel.getById(idAbacate);
      expect(name).to.equal('abacate');
      expect(quantity).to.equal(20);
    });
  });
  describe('Testa o model getByName no banco "products"', () => {
    it('Verifica se o model getByName no banco products', async () => {
      const { name, quantity } = await getByNameProductModel.getByName('melancia');
      expect(name).to.equal('melancia');
      expect(quantity).to.equal(15);
    })
  });
  describe('Testa o model updateQuantity no banco "products"', () => {
    it('Verifica se a quantidade do produto é atualizado', async () => {
      const products = await listProductsModel.list();
      const { _id } = products[1];
      const { name, quantity } = await getByIdProductModel.getById(_id);
      expect(name).to.equal('abacate');
      expect(quantity).to.equal(20);
      await updateQuantityProductModel.updateQuantity(_id, 50);
      const getNewProductById = await getByIdProductModel.getById(_id);
      expect(getNewProductById.name).to.equal('abacate');
      expect(getNewProductById.quantity).to.equal(50);
    })
  });
  describe('Testa o model create no banco "sales"', () => {
    it('Verifica se cria uma venda com retorno em objeto', async () => {
      const bodyMock = [
        {
        productId: "61a2a2e868bbb21c8a0158d6",
        quantity: 10,
        }
      ];
      const response = await createSaleModel.create(bodyMock);
      expect(response).to.be.a('object');
    });
    it('Verifica se cria uma venda com id válido', async () => {
      const bodyMock = [
        {
        productId: "61a2a2e868bbb21c8a0158d6",
        quantity: 20,
        }
      ];
      const response = await createSaleModel.create(bodyMock);
      expect(ObjectId.isValid(response._id)).to.be.true;
    });
    it('Verifica se o retorno contém uma chave itensSold', async () => {
      const getAllSales = await listSalesModel.list();
      const [firstSale] = getAllSales;
      expect(firstSale).to.have.all.deep.keys('_id', 'itensSold');
    })
  });
  describe('Testa o model delete no banco "sales"', () => {
    it('Verifica se deleta corretamente uma sale', async () => {
      const getAllSales = await listSalesModel.list();
      expect(getAllSales).to.have.length(2);
      const [firstSale] = getAllSales;
      await deleteSaleModel.remove(firstSale._id);
      const getNewAllSales = await listSalesModel.list();
      expect(getNewAllSales).to.have.length(1);
    });
  });
  describe('Testa o model getById no banco "sales"', () => {
    it('Verifica se passando um id inválido, retorna null', async () => {
      const getSaleById = await getByIdSaleModel.getById('111');
      expect(getSaleById).to.be.null;
    });
    it('Verifica se passando um id válido, retorna uma venda válida', async () => {
      const [firstSale] = await listSalesModel.list();
      const getSaleById = await getByIdSaleModel.getById(firstSale._id);
      expect(getSaleById).to.have.all.deep.keys('_id', 'itensSold');
    })
  });
  describe('Testa o model list no banco "sales"', () => {
    it('Verifica se o list retorna alguma sale', async () => {
      const getAllSales = await listSalesModel.list();
      expect(getAllSales).to.have.length(1);
    });
    it('Verifica se a sale tem todos os atributos', async () => {
      const [firstSale] = await listSalesModel.list();
      expect(firstSale).to.have.all.deep.keys('_id', 'itensSold');
    })
  });
  describe('Testa o model update no banco "sales"', () => {
    it('Verifica se a função update retorna null, ao passar um ID de venda inválido', async () => {
      const response = await updateSaleModel.update('111', 200, '111');
      expect(response).to.be.null;
    });
    it('Verifica se a função update atualiza a venda', async () => {
      const [firstSale] = await listSalesModel.list();
      const idVenda = firstSale._id;
      const idProduto = firstSale.itensSold[0].productId;
      await updateSaleModel.update(idProduto, 200, idVenda);
      const getSaleById = await getByIdSaleModel.getById(idVenda);
      expect(getSaleById.itensSold[1]).to.equal(200);
    });
  });
})



