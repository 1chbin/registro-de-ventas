import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { VentasRepository } from './ventas.repository';
import { Venta } from './ventas.model';
import { CreateVentaDto } from './dto/create-venta-dto';
import { UpdateVentaDto } from './dto/update-venta-dto';
import { ProductosRepository } from '../productos/productos.repository';

@Injectable()
export class VentasService {
    constructor(
        private readonly repository: VentasRepository,
        private readonly productosRepository: ProductosRepository,
    ) { }

    async buscarTodosLasVentas(): Promise<Venta[]> {
        return await this.repository.findAll();
    }

    async buscarVentaPorId(id: string): Promise<Venta | null> {
        const ventaBuscado = await this.repository.findById(id);
        if (ventaBuscado != undefined && ventaBuscado !== null) {
            return ventaBuscado;
        }
        throw new NotFoundException('Venta no encontrada');
    }

    async crearVenta(body: CreateVentaDto): Promise<Venta> {
        if (body.cantidad <= 0) {
            throw new BadRequestException('La cantidad debe ser mayor a 0');
        }

        const producto = await this.productosRepository.findById(body.productoId);
        if (!producto) {
            throw new NotFoundException('Producto no encontrado');
        }

        if (producto.stock < body.cantidad) {
            throw new ConflictException({
                mensaje: 'Stock insuficiente',
                stockDisponible: producto.stock,
                cantidadSolicitada: body.cantidad,
            });
        }

        const precioUnitario = producto.precio;
        const subtotal = precioUnitario * body.cantidad;

        const productoActualizado = await this.productosRepository.decrementarStock(
            body.productoId,
            body.cantidad,
        );

        if (!productoActualizado) {
            throw new ConflictException('Stock insuficiente');
        }

        const venta = new Venta(
            body.productoId,
            body.cantidad,
            precioUnitario,
            subtotal,
        );

        return await this.repository.save(venta);
    }

    async modificarVenta(id: string, body: UpdateVentaDto): Promise<Venta> {
        const actualizado = await this.repository.update(id, body);

        if (!actualizado) {
            throw new NotFoundException('Venta no encontrada');
        }

        return actualizado;
    }

    async eliminarVenta(id: string): Promise<boolean> {
        const eliminado = await this.repository.delete(id);

        if (!eliminado) {
            throw new NotFoundException('Venta no encontrada');
        }

        return true;
    }
}
