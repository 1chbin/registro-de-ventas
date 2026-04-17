import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ComerciosService } from './comercios.service';
import { Comercio } from './comercio.model';
import type { CreateComercioDTO } from './dto/create-comercio.dto';
import type { UpdateComercioDTO } from './dto/update.comercio.dto';

@Controller('comercios')
export class ComerciosController {
  constructor(private readonly comerciosService: ComerciosService) {}

  @Get ()
  findAll(): Comercio[] {
    return this.comerciosService.buscarTodosLosComercios();
  }

  @Get ("/:id")
    findById(@Param("id") id: number): Comercio {
      return this.comerciosService.buscarComercioPorId(id);
    }

  @Post ()
    create(@Body() body: CreateComercioDTO): boolean {
      return this.comerciosService.crearComercio(body);
    }

  @Put("/:id")
    update(@Param("id") id: number, @Body() body: UpdateComercioDTO): boolean {
      return this.comerciosService.modificarComercio(id, body);
    }

  @Delete("/:id")
    delete(@Param("id") id: number): boolean {
      return this.comerciosService.eliminarComercio(id);
    }

}
