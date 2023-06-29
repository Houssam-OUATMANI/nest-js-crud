import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {ProductService} from "./product.service";
import {StoreProductDto} from "./dto/store.product.dto";
import {UpdateProductDto} from "./dto/update.product.dto";

@Controller('products')
export class ProductController {
    constructor(private  readonly  productService : ProductService) {}

    @Get()
    index() {
        return this.productService.index()
    }

    @Get(":id")
    show(@Param("id", ParseIntPipe) id : number) {
        return this.productService.show(id)
    }

    @Post()
    store(@Body() storeProductDto : StoreProductDto) {
        return this.productService.store(storeProductDto)
    }

    @Put(":id")
    update(@Body() updateProductDto : UpdateProductDto,@Param("id", ParseIntPipe) id : number) {
        return this.productService.update(updateProductDto, id)
    }

    @Delete(":id")
    destroy(@Param("id", ParseIntPipe) id : number) {
        return this.productService.destroy(id)
    }
}
