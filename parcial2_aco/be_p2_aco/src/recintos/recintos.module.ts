import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recinto } from './entities/recinto.entity';
import { RecintosController } from './recintos.controller';
import { RecintosService } from './recintos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recinto])],
  controllers: [RecintosController],
  providers: [RecintosService],
  exports: [RecintosService, TypeOrmModule],
})
export class RecintosModule {}
