import {Injectable, NotFoundException} from '@nestjs/common';
import {StoreProductDto} from "./dto/store.product.dto";
import {PrismaService} from "../prisma/prisma.service";
import {UpdateProductDto} from "./dto/update.product.dto";

@Injectable()
export class ProductService {
    constructor(private readonly prismaService: PrismaService) {}

    async store(storeProductDto: StoreProductDto) {
        await this.prismaService.product.create({data: {...storeProductDto}});
        return {message: "Product created"}
    }


    async index() {
        return this.prismaService.product.findMany();
    }

    async show(id: number) {
        const product = await this.findProductById(id)
        if (!product) throw new NotFoundException("Not Found");
        return product;
    }

    async update(updateProductDto: UpdateProductDto, id: number) {
        const product = await this.findProductById(id)
        if (!product) throw  new NotFoundException("Not Found");
        await this.prismaService.product.update({where: {productId: id}, data: {...updateProductDto}});
        return {message: "product updated"}
    }

    async destroy(id: number) {
        const product = await this.findProductById(id)
        if (!product) throw  new NotFoundException("Not Found");
        await this.prismaService.product.delete({where: {productId: id}})
        return {message: "product deleted"}
    }

    private async findProductById(productId: number) {
        return this.prismaService.product.findUnique({where: {productId}});
    }
}
