import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductServiceMock } from './mocks/Product.service.mock';
import { productMock } from './mocks/product.mock';

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [{ provide: ProductService, useClass: ProductServiceMock }]
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe("index", () => {
    it("should return an array of product", () => {
      expect(controller.index()).resolves.toEqual(productMock)
    })
  })
  describe("show", () => {
    it("should return a single product", () => {
      const id = 1
      const p = productMock.find(p => p.productId === id)
      expect(controller.show(1)).resolves.toEqual(p)
    })
  })
  describe("store", () => {
    it('should return {message: "Product created"}', () => {
      expect(controller.store(productMock[0])).resolves.toEqual({message: "Product created"})
    })
  })
  describe("update", () => {
    it('should return  {message: "product updated"}', () => {
      expect(controller.update(productMock[0], 1)).resolves.toEqual( {message: "product updated"})
    })
  })
  describe("destroy", () => {
    it('should return  {message: "product deleted"}', () => {
      expect(controller.destroy(1)).resolves.toEqual( {message: "product deleted"})
    })
  })
});
