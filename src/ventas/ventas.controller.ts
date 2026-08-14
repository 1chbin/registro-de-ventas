import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Venta } from './ventas.model';
import { CreateVentaDto } from './dto/create-venta-dto';
import { UpdateVentaDto } from './dto/update-venta-dto';
import { VentasService } from './ventas.service';

@Controller('ventas')
export class VentasController {
    constructor(private readonly ventasService: VentasService) { }

    @Get()
    async findAll(): Promise<Venta[]> {
        return await this.ventasService.buscarTodosLasVentas();
    }

    @Get("/:id")
    async findById(@Param("id") id: string): Promise<Venta | null> {
        return await this.ventasService.buscarVentaPorId((id));
    }

    @Post()
    async create(@Body() body: CreateVentaDto): Promise<Venta> {
        return await this.ventasService.crearVenta(body);
    }

    @Put("/:id")
    async update(@Param("id") id: string, @Body() body: UpdateVentaDto): Promise<Venta> {
        return await this.ventasService.modificarVenta(id, body);
    }

    @Delete("/:id")
    async delete(@Param("id") id: string): Promise<boolean> {
        return await this.ventasService.eliminarVenta(id);
    }

}
