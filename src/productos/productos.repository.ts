import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Producto, ProductoDocument } from "./producto.model";

@Injectable()
    export class ProductosRepository {

        constructor(
            @InjectModel(Producto.name) private readonly productoModel: Model<ProductoDocument>
        ) {}

        async save(producto: Producto): Promise<Producto>{
            const productoCreado = await this.productoModel.create(producto);
            return productoCreado.toObject();
        }

        async update(id: string, producto: Partial<Producto>): Promise<Producto | null>{
            return await this.productoModel.findByIdAndUpdate(id, producto, { runValidators: true}).lean().exec();
        }

        async findAll(): Promise<Producto[]> {
            return await this.productoModel.find().lean().exec();
        }

        async findById(id: string): Promise<Producto | null> {
            return await this.productoModel.findById(id).lean().exec();
        }

        async delete(id: string): Promise<boolean> {
            const eliminado = await this.productoModel.findByIdAndDelete(id).lean().exec();
            return Boolean(eliminado);
        }

        async decrementarStock(id: string, cantidad: number): Promise<Producto | null> {
            return this.productoModel.findOneAndUpdate(
                { _id: id, stock: { $gte: cantidad } },
                { $inc: { stock: -cantidad } },
                { new: true, runValidators: true },
            ).lean().exec();
        }
    }