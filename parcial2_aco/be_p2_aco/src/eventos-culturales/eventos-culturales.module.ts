import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recinto } from '../recintos/entities/recinto.entity';
import { EventoCultural } from './entities/evento-cultural.entity';
import { EventosCulturalesController } from './eventos-culturales.controller';
import { EventosCulturalesService } from './eventos-culturales.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventoCultural, Recinto])],
  controllers: [EventosCulturalesController],
  providers: [EventosCulturalesService],
  exports: [EventosCulturalesService, TypeOrmModule],
})
export class EventosCulturalesModule {}
