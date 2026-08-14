import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Venta, VentaDocument } from "./ventas.model";

@Injectable()
    export class VentasRepository {

        constructor(
            @InjectModel(Venta.name) private readonly ventaModel: Model<VentaDocument>
        ) {}

        async save(venta: Venta): Promise<Venta>{
            const ventaCreado = await this.ventaModel.create(venta);
            return ventaCreado.toObject();
        }

        async update(id: string, venta: Partial<Venta>): Promise<Venta | null>{
            return await this.ventaModel.findByIdAndUpdate(id, venta, { runValidators: true}).lean().exec();
        }

        async findAll(): Promise<Venta[]> {
            return await this.ventaModel.find().lean().exec();
        }

        async findById(id: string): Promise<Venta | null> {
            return await this.ventaModel.findById(id).lean().exec();
        }

        async delete(id: string): Promise<boolean> {
            const eliminado = await this.ventaModel.findByIdAndDelete(id).lean().exec();
            return Boolean(eliminado);
        }

    }