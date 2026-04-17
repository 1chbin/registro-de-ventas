import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComerciosModule } from './comercios/comercios.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ComerciosModule],
})
export class AppModule {}
