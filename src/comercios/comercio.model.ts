import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ComercioDocument = HydratedDocument<Comercio>;

@Schema({
    collection: 'comercios',
    versionKey: false
})
export class Comercio {
    _id!: string;

    @Prop({ required: true })
    fechaAlta: string;

    @Prop({ required: true, trim: true })
    nombre: string;
    
    constructor(
        nombre: string,
    ) {
        this.fechaAlta = Date();
        this.nombre = nombre;
    }

}

    export const ComercioSchema = SchemaFactory.createForClass(Comercio);