import { productMock } from "./product.mock"

export class ProductServiceMock {
    index = jest.fn().mockResolvedValue(productMock)
    show = jest.fn().mockImplementation((id : number) => {
        return Promise.resolve(productMock.find(p => p.productId === id))
    })
    store = jest.fn().mockResolvedValue({message: "Product created"})
    update = jest.fn().mockResolvedValue( {message: "product updated"})
    destroy = jest.fn().mockResolvedValue({message: "product deleted"})
}