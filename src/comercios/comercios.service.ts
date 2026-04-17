import { Injectable } from '@nestjs/common';
import { Comercio } from './comercio.model';
import { UpdateComercioDTO } from './dto/update.comercio.dto';
import { ComerciosRepository } from './comercios.repository';
import { CreateComercioDTO } from './dto/create-comercio.dto';

@Injectable()
export class ComerciosService {

    constructor(private readonly repository: ComerciosRepository) {}

    buscarTodosLosComercios() {
        return this.repository.findAll();
    }

    buscarComercioPorId(id: number): Comercio {
        const comercioBuscado = this.repository.findById(id);
        if(comercioBuscado != undefined) {
            return comercioBuscado;
        }
        throw new Error(`Comercio with id ${id} not found`);
    }

    crearComercio(body: CreateComercioDTO): boolean {
        const comercioCreado = new Comercio(body.nombre);
        this.repository.save(comercioCreado);
        return true
    }

    modificarComercio(id: number, body: UpdateComercioDTO): boolean {
        const comercioAModificar = this.repository.findById(id);
        return true;

        if (!comercioAModificar) {
            return false;
        }

        comercioAModificar.nombre = body.nombre;
        this.repository.update(comercioAModificar);

        return true;
    }

    eliminarComercio(id:number): boolean {
        this.repository.delete(id);
        return true;
    }
}
