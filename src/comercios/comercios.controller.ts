import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ComerciosService } from './comercios.service';
import { Comercio } from './comercio.model';
import type { CreateComercioDTO } from './dto/create-comercio.dto';
import type { UpdateComercioDTO } from './dto/update.comercio.dto';

@Controller('comercios')
export class ComerciosController {
  constructor(private readonly comerciosService: ComerciosService) {}

  @Get ()
  async findAll(): Promise<Comercio[]> {
    return await this.comerciosService.buscarTodosLosComercios();
  }

  @Get ("/:id")
    async findById(@Param("id") id: string): Promise<Comercio | null> {
      return await this.comerciosService.buscarComercioPorId((id));
    }

  @Post ()
    async create(@Body() body: CreateComercioDTO): Promise<Comercio> {
      return await this.comerciosService.crearComercio(body);
    }

  @Put("/:id")
    async update(@Param("id") id: string, @Body() body: UpdateComercioDTO): Promise<Comercio> {
      return await this.comerciosService.modificarComercio(id, body);
    }

  @Delete("/:id")
    async delete(@Param("id") id: string): Promise <boolean> {
      return await this.comerciosService.eliminarComercio(id);
    }

}
