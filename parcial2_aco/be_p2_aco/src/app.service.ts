import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'API Parcial 2 SIS257 - Agenda y Boletaje de Eventos Culturales';
  }
}
