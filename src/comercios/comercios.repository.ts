import { Injectable } from "@nestjs/common";
import { Comercio, ComercioDocument } from "./comercio.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
    export class ComerciosRepository {

        constructor(
            @InjectModel(Comercio.name) private readonly comercioModel: Model<ComercioDocument>
        ) {}

        async save(comercio: Comercio): Promise<Comercio>{
            const comercioCreado = await this.comercioModel.create(comercio);
            return comercioCreado.toObject();
        }

        async update(id: string, comercio: Partial<Comercio>): Promise<Comercio | null>{
            return await this.comercioModel.findByIdAndUpdate(id, comercio, { runValidators: true}).lean().exec();
        }

        async findAll(): Promise<Comercio[]> {
            return await this.comercioModel.find().lean().exec();
        }

        async findById(id: string): Promise<Comercio | null> {
            return await this.comercioModel.findById(id).lean().exec();
        }

        async delete(id: string): Promise<boolean> {
            const eliminado = await this.comercioModel.findByIdAndDelete(id).lean().exec();
            return Boolean(eliminado);
        }
    }