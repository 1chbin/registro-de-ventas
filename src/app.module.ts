import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComerciosModule } from './comercios/comercios.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductosModule } from './productos/productos.module';
import { ConfigModule } from '@nestjs/config';
import { AiModule } from './ai/ai.module';
import { VentasModule } from './ventas/ventas.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),ComerciosModule, MongooseModule.forRoot('mongodb://localhost:27017/ventas'), ProductosModule, AiModule, VentasModule],
})
export class AppModule {}
