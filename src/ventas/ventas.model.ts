import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { VentaItem, VentaItemSchema } from './venta-item.model';

export type VentaDocument = HydratedDocument<Venta>;

@Schema({ collection: 'ventas', versionKey: false })
export class Venta {
    _id!: string;

    @Prop({ required: true, default: () => new Date() })
    fecha: Date;

    @Prop({ type: [VentaItemSchema], required: true })
    items: VentaItem[];

    @Prop({ required: true, min: 0 })
    total: number;

    constructor(items: VentaItem[], total: number) {
        this.fecha = new Date();
        this.items = items;
        this.total = total;
    }
}

export const VentaSchema = SchemaFactory.createForClass(Venta);