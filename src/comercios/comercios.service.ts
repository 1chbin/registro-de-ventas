import { Injectable, NotFoundException } from '@nestjs/common';
import { Comercio } from './comercio.model';
import { UpdateComercioDTO } from './dto/update.comercio.dto';
import { ComerciosRepository } from './comercios.repository';
import { CreateComercioDTO } from './dto/create-comercio.dto';

@Injectable()
export class ComerciosService {

    constructor(private readonly repository: ComerciosRepository) {}

    async buscarTodosLosComercios(): Promise<Comercio[]> {
        return await this.repository.findAll();
    }

    async buscarComercioPorId(id: string): Promise<Comercio | null> {
        const comercioBuscado = await this.repository.findById(id);
        if(comercioBuscado != undefined && comercioBuscado !== null) {
            return comercioBuscado;
        }
        throw new NotFoundException('Comercio no encontrado')
    }

    async crearComercio(body: CreateComercioDTO): Promise<Comercio> {
        const comercioCreado = new Comercio(body.nombre);
        return await this.repository.save(comercioCreado);
    }

    async modificarComercio(id: string, body: UpdateComercioDTO): Promise<Comercio> {
        const actualizado = await this.repository.update(id, body)

        if(!actualizado){
            throw new NotFoundException('Comercio no encontrado');
        }

        return actualizado;
    }

    async eliminarComercio(id:string): Promise<boolean> {
        const eliminado = await this.repository.delete(id);

        if(!eliminado){
            throw new NotFoundException('Comercio no encontrado');
        }
        
        return true;
    }
}
