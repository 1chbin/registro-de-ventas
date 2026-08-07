import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import { TipoDeProducto } from '../tipo-productos.enum';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
    nombre?: string;
    comercioId?: string;
    descripcion?: string;
    sku?: string;
    tipo?: TipoDeProducto;
}
