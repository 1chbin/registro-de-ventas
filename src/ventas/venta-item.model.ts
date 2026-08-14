import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false, versionKey: false })
export class VentaItem {
    @Prop({ required: true, trim: true })
    productoId: string;

    @Prop({ required: true, min: 1 })
    cantidad: number;

    @Prop({ required: true, min: 0 })
    precioUnitario: number;

    @Prop({ required: true, min: 0 })
    subtotal: number;
}

export const VentaItemSchema = SchemaFactory.createForClass(VentaItem);