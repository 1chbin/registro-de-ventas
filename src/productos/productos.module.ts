import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { Producto, ProductoSchema } from './producto.model';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductosRepository } from './productos.repository';
import { ProductosImagesService } from './productos-images.service';
import { AiModule } from '../ai/ai.module';
import { ComerciosModule } from '../comercios/comercios.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Producto.name, schema: ProductoSchema }]),
    AiModule,
    ComerciosModule,
  ],
  controllers: [ProductosController],
  providers: [ProductosService, ProductosRepository, ProductosImagesService],
  exports: [ProductosRepository],
})
export class ProductosModule {}
