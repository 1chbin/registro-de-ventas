import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Venta, VentaSchema } from './ventas.model';
import { VentasController } from './ventas.controller';
import { VentasService } from './ventas.service';
import { VentasRepository } from './ventas.repository';
import { ProductosModule } from '../productos/productos.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Venta.name, schema: VentaSchema }]),
    ProductosModule,
  ],
  controllers: [VentasController],
  providers: [VentasService, VentasRepository],
})
export class VentasModule {}
