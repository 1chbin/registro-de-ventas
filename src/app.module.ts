import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComerciosModule } from './comercios/comercios.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductosModule } from './productos/productos.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ComerciosModule, MongooseModule.forRoot('mongodb://localhost:27017/ventas'), ProductosModule],
})
export class AppModule {}
