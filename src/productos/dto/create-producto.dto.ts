import { TipoDeProducto } from "../tipo-productos.enum";

export class CreateProductoDto {
    nombre: string;
    comercioId: string;
    descripcion: string;
    sku: string;
    tipo: TipoDeProducto;
}
