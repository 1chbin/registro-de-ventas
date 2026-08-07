// De los productos nos va a interesar su nombre, el comercio en el que pertenecen, su SKU y el tipo de producto.
// Los tipos de producto van a ser un enumerado (ENUM) entre hogar, indumentaria y electronica

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { TipoDeProducto } from "./tipo-productos.enum";

export type ProductoDocument = HydratedDocument<Producto>;

@Schema({
    collection: 'productos',
    versionKey: false
})
export class Producto {
    _id!: string;

    @Prop({ required: true })
    fechaAlta: string;

    @Prop({ required: true, trim: true })
    nombre: string;

    @Prop({ required: true, trim: true })
    descripcion: string;

    @Prop({ required: true, trim: true })
    comercioId: string;

    @Prop({ required: true, trim: true })
    sku: string;

    @Prop({ required: true, enum: TipoDeProducto })
    tipo: TipoDeProducto;

    constructor(
        nombre: string,
        comercioId: string,
        descripcion: string,
        sku: string,
        tipo: TipoDeProducto,
    ) {
        this.fechaAlta = Date();
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.comercioId = comercioId;
        this.sku = sku;
        this.tipo = tipo;
    }

}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
