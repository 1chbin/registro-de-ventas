import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VentaDocument = HydratedDocument<Venta>;

@Schema({ collection: 'ventas', versionKey: false })
export class Venta {
    _id!: string;

    @Prop({ required: true, trim: true })
    productoId: string;

    @Prop({ required: true, min: 1 })
    cantidad: number;

    @Prop({ required: true, min: 0 })
    precioUnitario: number;

    @Prop({ required: true, min: 0 })
    subtotal: number;

    constructor(
        productoId: string,
        cantidad: number,
        precioUnitario: number,
        subtotal: number,
    ) {
        this.productoId = productoId;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.subtotal = subtotal;
    }
}

export const VentaSchema = SchemaFactory.createForClass(Venta);
