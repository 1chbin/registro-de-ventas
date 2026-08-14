import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ProductosRepository } from './productos.repository';
import { Producto } from './producto.model';
import { ProductosImagesService } from './productos-images.service';
import { AiService } from '../ai/ai.service';
import type { ArchivoImagen } from './types/archivo-imagen.type';

@Injectable()
export class ProductosService {
  constructor(
    private readonly productosRepository: ProductosRepository,
    private readonly productosImagesService: ProductosImagesService,
    private readonly aiService: AiService,
  ) {}

  async crearProducto(body: CreateProductoDto): Promise<Producto> {
    const producto = new Producto(
      body.nombre,
      body.comercioId,
      body.descripcion,
      body.sku,
      body.tipo,
      body.stock ?? 0,
      body.precio ?? 0,
    );
    return this.productosRepository.save(producto);
  }

  async subirImagen(id: string, archivo: ArchivoImagen): Promise<Producto> {
    const producto = await this.productosRepository.findById(id);
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    try {
      this.productosImagesService.validarArchivo(archivo);
    } catch (error) {
      if (error instanceof Error) {
        throw this.mapErrorArchivo(error.message);
      }
      throw error;
    }

    const imagenBase64 = archivo.buffer.toString('base64');
    const validacion = await this.aiService.validarImagenProducto(
      producto.nombre,
      producto.descripcion,
      imagenBase64,
      archivo.mimetype,
    );

    if (!validacion.esImagenIdeal) {
      throw new ConflictException({
        mensaje: 'La imagen no es ideal para este producto',
        motivo: validacion.motivo,
      });
    }

    const imageUrl = await this.productosImagesService.guardarImagen(id, archivo);

    if (producto.image) {
      await this.productosImagesService.eliminarImagen(producto.image);
    }

    const productoActualizado = await this.productosRepository.update(id, {
      image: imageUrl,
    });

    if (!productoActualizado) {
      throw new NotFoundException('Producto no encontrado');
    }

    return productoActualizado;
  }

  async findAll(): Promise<Producto[]> {
    return this.productosRepository.findAll();
  }

  async findOne(id: string): Promise<Producto | null> {
    return this.productosRepository.findById(id);
  }

  async update(
    id: string,
    updateProductoDto: UpdateProductoDto,
  ): Promise<Producto | null> {
    return this.productosRepository.update(id, updateProductoDto);
  }

  async remove(id: string): Promise<boolean> {
    const producto = await this.productosRepository.findById(id);
    if (!producto) {
      return false;
    }

    await this.productosImagesService.eliminarImagen(producto.image);
    return this.productosRepository.delete(id);
  }

  private mapErrorArchivo(codigo: string): BadRequestException {
    switch (codigo) {
      case 'ARCHIVO_REQUERIDO':
        return new BadRequestException('Debe enviar una imagen en el campo "imagen"');
      case 'TIPO_ARCHIVO_INVALIDO':
        return new BadRequestException(
          'Tipo de archivo inválido. Use JPEG, PNG o WEBP',
        );
      case 'ARCHIVO_DEMASIADO_GRANDE':
        return new BadRequestException('La imagen no puede superar los 5 MB');
      default:
        return new BadRequestException('Archivo inválido');
    }
  }
}
