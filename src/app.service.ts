import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  saludoPara(nombre:string) {
    return `Hola ${nombre}, buenos dias`
  }
}
