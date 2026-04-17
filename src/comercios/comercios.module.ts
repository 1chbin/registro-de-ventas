import { Module } from '@nestjs/common';
import { ComerciosService } from './comercios.service';
import { ComerciosController } from './comercios.controller';
import { ComerciosRepository } from './comercios.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Comercio, ComercioSchema } from './comercio.model';

@Module({
  imports: [ MongooseModule.forFeature([{ name: Comercio.name, schema: ComercioSchema }])],
  controllers: [ComerciosController],
  providers: [ComerciosService, ComerciosRepository],
})
export class ComerciosModule {}
