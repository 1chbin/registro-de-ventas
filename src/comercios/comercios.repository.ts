import { Injectable } from "@nestjs/common";
import { Comercio } from "./comercio.model";

@Injectable()
    export class ComerciosRepository {
        private proximoId = 1;
        private comercios: Comercio[] = [];

        save(comercio: Comercio){
            comercio.setId(this.proximoId);
            this.comercios.push(comercio);
            this.proximoId++;
        }

        update(comercio: Comercio){
            //NO es relevante
        }

        findAll() {
            return this.comercios;
        }

        findById(id: number): Comercio {
            const comercio = this.comercios.find(c => c.id === id);
            if (!comercio) {
                throw new Error(`Comercio with id ${id} not found`);
            }
            return comercio;
        }

        delete(id: number) {
            this.comercios = this.comercios.filter(c => c.id !== id);
        }
    }