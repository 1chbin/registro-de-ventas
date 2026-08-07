import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './producto.model';
import type { ArchivoImagen } from './types/archivo-imagen.type';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  async crearProducto(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.crearProducto(createProductoDto);
  }

  @Post(':id/imagen')
  @UseInterceptors(FileInterceptor('imagen'))
  async subirImagen(
    @Param('id') id: string,
    @UploadedFile() imagen: ArchivoImagen,
  ): Promise<Producto> {
    return this.productosService.subirImagen(id, imagen);
  }

  @Get()
  async findAll(): Promise<Producto[]> {
    return this.productosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Producto | null> {
    return this.productosService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductoDto: UpdateProductoDto,
  ): Promise<Producto | null> {
    return this.productosService.update(id, updateProductoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.productosService.remove(id);
  }
}
