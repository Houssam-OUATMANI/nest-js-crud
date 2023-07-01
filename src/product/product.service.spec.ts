import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from '../prisma/prisma.service';
import { ProductPrismaMock } from './mocks/Product.prisma.mock';
import { productMock } from './mocks/product.mock';
import { NotFoundException } from '@nestjs/common';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, {provide : PrismaService, useValue : ProductPrismaMock}],
      
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("index", () => {
    it("should return an array of product", () => {
      expect(service.index()).resolves.toEqual(productMock)
    })
  })
  describe("show", () => {
    it("should return a single product", () => {
      jest.spyOn(ProductPrismaMock.product, 'findUnique').mockResolvedValue(productMock[0])
      expect(service.show(1)).resolves.toEqual(productMock[0])
    })

    it("should throw a not found exception", () => {
      jest.spyOn(ProductPrismaMock.product, 'findUnique').mockResolvedValue(undefined)
      expect(() => service.show(1)).rejects.toBeInstanceOf(NotFoundException)
      expect(() => service.show(1)).rejects.toEqual(new NotFoundException("Not Found"))
    })
  })
  describe("update", () => {
    it('should return {message: "product updated"}', () => {
      jest.spyOn(ProductPrismaMock.product, 'findUnique').mockResolvedValue(productMock[0])
      expect(service.update(productMock[0], 1)).resolves.toEqual({message: "product updated"})
    })

    it("should throw a not found exception", () => {
      jest.spyOn(ProductPrismaMock.product, 'findUnique').mockResolvedValue(undefined)
      expect(() => service.update( productMock[0], 1)).rejects.toBeInstanceOf(NotFoundException)
      expect(() => service.update( productMock[0], 1)).rejects.toEqual(new NotFoundException("Not Found"))
    })
  })


  describe("delete", () => {
    it('should return {message: "product deleted"}', () => {
      jest.spyOn(ProductPrismaMock.product, 'findUnique').mockResolvedValue(productMock[0])
      expect(service.destroy(1)).resolves.toEqual({message: "product deleted"})
    })

    it("should throw a not found exception", () => {
      jest.spyOn(ProductPrismaMock.product, 'findUnique').mockResolvedValue(undefined)
      expect(() => service.destroy(1)).rejects.toBeInstanceOf(NotFoundException)
      expect(() => service.destroy(1)).rejects.toEqual(new NotFoundException("Not Found"))
    })
  })

  
  describe("store", () => {
    it('should return {message: "Product created"}', () => {
      expect(service.store(productMock[0])).resolves.toEqual({message: "Product created"})
    })

  
  })

  

});
