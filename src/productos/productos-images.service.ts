import { Injectable } from '@nestjs/common';
import { mkdir, unlink, writeFile } from 'fs/promises';
import { join, extname } from 'path';
import { randomUUID } from 'crypto';
import type { ArchivoImagen } from './types/archivo-imagen.type';

const UPLOAD_DIR = join(process.cwd(), 'uploads', 'productos');
const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
]);
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

@Injectable()
export class ProductosImagesService {
  async guardarImagen(
    productoId: string,
    archivo: ArchivoImagen,
  ): Promise<string> {
    this.validarArchivo(archivo);

    await mkdir(UPLOAD_DIR, { recursive: true });

    const extension = extname(archivo.originalname) || this.extensionPorMime(archivo.mimetype);
    const nombreArchivo = `${productoId}-${randomUUID()}${extension}`;
    const rutaCompleta = join(UPLOAD_DIR, nombreArchivo);

    await writeFile(rutaCompleta, archivo.buffer);

    return `/uploads/productos/${nombreArchivo}`;
  }

  async eliminarImagen(imageUrl?: string): Promise<void> {
    if (!imageUrl) {
      return;
    }

    const nombreArchivo = imageUrl.replace('/uploads/productos/', '');
    if (!nombreArchivo || nombreArchivo.includes('..')) {
      return;
    }

    const rutaCompleta = join(UPLOAD_DIR, nombreArchivo);

    try {
      await unlink(rutaCompleta);
    } catch {
      // Si el archivo ya no existe, no bloqueamos la operación.
    }
  }

  validarArchivo(archivo: ArchivoImagen): void {
    if (!archivo) {
      throw new Error('ARCHIVO_REQUERIDO');
    }

    if (!ALLOWED_MIME_TYPES.has(archivo.mimetype)) {
      throw new Error('TIPO_ARCHIVO_INVALIDO');
    }

    if (archivo.size > MAX_FILE_SIZE_BYTES) {
      throw new Error('ARCHIVO_DEMASIADO_GRANDE');
    }
  }

  private extensionPorMime(mimeType: string): string {
    switch (mimeType) {
      case 'image/png':
        return '.png';
      case 'image/webp':
        return '.webp';
      default:
        return '.jpg';
    }
  }
}
