export class Comercio {
    id!: number;
    fechaAlta: Date;
    nombre: string;
    
    constructor(
        nombre: string,
    ) {
        this.fechaAlta = new Date();
        this.nombre = nombre;
    }

    setId(id: number) {
        this.id = id;
    }


}