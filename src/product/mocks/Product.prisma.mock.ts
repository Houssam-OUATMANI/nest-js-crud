import { productMock } from "./product.mock";

export const ProductPrismaMock = {
    product : {
        findMany : jest.fn().mockResolvedValue(productMock),
        findUnique : jest.fn(),
        create : jest.fn().mockResolvedValue(productMock[0]),
        update : jest.fn(),
        delete : jest.fn(),
    }
}