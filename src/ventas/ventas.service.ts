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
import { VentaItem } from './venta-item.model';

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

//------------------ Validaciones ------------------

        if (!body.items?.length) {
            throw new BadRequestException('La venta debe tener al menos un producto');
        }

        const itemsResueltos: VentaItem[] = [];

        for (const item of body.items) {
            if (item.cantidad <= 0) {
                throw new BadRequestException('La cantidad debe ser mayor a 0');
            }

            const producto = await this.productosRepository.findById(item.productoId);
            if (!producto) {
                throw new NotFoundException(`Producto ${item.productoId} no encontrado`);
            }

            if (producto.stock < item.cantidad) {
                throw new ConflictException({
                    mensaje: 'Stock insuficiente',
                    productoId: item.productoId,
                    stockDisponible: producto.stock,
                    cantidadSolicitada: item.cantidad,
                });
            }

//------------------ Fin de validaciones ------------------

            itemsResueltos.push({
                productoId: item.productoId,
                cantidad: item.cantidad,
                precioUnitario: producto.precio,
                subtotal: producto.precio * item.cantidad,
            });
        }

        // Los descontamos
        for (const item of itemsResueltos) {
            const actualizado = await this.productosRepository.decrementarStock(
                item.productoId,
                item.cantidad,
            );
            if (!actualizado) {
                throw new ConflictException({
                    mensaje: 'Stock insuficiente',
                    productoId: item.productoId,
                });
            }
        }

        // Calculos del total
        const total = itemsResueltos.reduce((acc, i) => acc + i.subtotal, 0);
        const venta = new Venta(itemsResueltos, total);

        return this.repository.save(venta);
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
