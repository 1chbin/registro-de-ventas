import { Module } from '@nestjs/common';
import { ComerciosService } from './comercios.service';
import { ComerciosController } from './comercios.controller';
import { ComerciosRepository } from './comercios.repository';

@Module({
  controllers: [ComerciosController],
  providers: [ComerciosService, ComerciosRepository],
})
export class ComerciosModule {}
