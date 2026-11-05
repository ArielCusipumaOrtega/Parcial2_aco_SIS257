import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventoCulturalDto } from './dto/create-evento-cultural.dto';
import { UpdateEventoCulturalDto } from './dto/update-evento-cultural.dto';
import { EventoCultural } from './entities/evento-cultural.entity';
import { Recinto } from '../recintos/entities/recinto.entity';

@Injectable()
export class EventosCulturalesService {
  constructor(
    @InjectRepository(EventoCultural)
    private readonly eventosRepository: Repository<EventoCultural>,
    @InjectRepository(Recinto)
    private readonly recintosRepository: Repository<Recinto>,
  ) {}

  async create(createDto: CreateEventoCulturalDto): Promise<EventoCultural> {
    const idRecinto = createDto.idRecinto;
    if (!idRecinto) {
      throw new BadRequestException('El campo id_recinto es obligatorio');
    }

    const artistaPrincipal = createDto.artistaPrincipal;
    if (!artistaPrincipal) {
      throw new BadRequestException('El campo artista_principal es obligatorio');
    }

    const duracionMinutos = createDto.duracionMinutos;
    if (duracionMinutos === undefined || duracionMinutos === null) {
      throw new BadRequestException('El campo duracion_minutos es obligatorio');
    }

    const precioEntrada = createDto.precioEntrada;
    if (precioEntrada === undefined || precioEntrada === null) {
      throw new BadRequestException('El campo precio_entrada es obligatorio');
    }

    const fechaEvento = createDto.fechaEvento;
    if (!fechaEvento) {
      throw new BadRequestException('El campo fecha_evento es obligatorio');
    }

    // Validar existencia del recinto
    const recinto = await this.recintosRepository.findOneBy({ id: idRecinto });
    if (!recinto) {
      throw new NotFoundException(`El recinto con ID ${idRecinto} no existe`);
    }

    // Validar duplicado
    const existing = await this.eventosRepository.findOneBy({
      idRecinto,
      titulo: createDto.titulo.trim(),
      fechaEvento: fechaEvento as any,
    });
    if (existing) {
      throw new ConflictException('Ya existe un evento con el mismo título en este recinto para la misma fecha');
    }

    const evento = new EventoCultural();
    evento.idRecinto = idRecinto;
    evento.titulo = createDto.titulo.trim();
    evento.artistaPrincipal = artistaPrincipal.trim();
    evento.duracionMinutos = duracionMinutos;
    evento.precioEntrada = Number(precioEntrada);
    evento.fechaEvento = fechaEvento;
    evento.estado = createDto.estado;

    const saved = await this.eventosRepository.save(evento);
    return this.findOne(saved.id);
  }

  async findAll(): Promise<EventoCultural[]> {
    return this.eventosRepository.find({
      relations: { recinto: true },
      order: { titulo: 'ASC' },
    });
  }

  async findOne(id: number): Promise<EventoCultural> {
    const evento = await this.eventosRepository.findOne({
      where: { id },
      relations: { recinto: true },
    });
    if (!evento) {
      throw new NotFoundException(`El evento cultural con ID ${id} no existe`);
    }
    return evento;
  }

  async update(id: number, updateDto: UpdateEventoCulturalDto): Promise<EventoCultural> {
    const evento = await this.findOne(id);

    const idRecinto = updateDto.idRecinto;
    if (idRecinto !== undefined) {
      const recinto = await this.recintosRepository.findOneBy({ id: idRecinto });
      if (!recinto) {
        throw new NotFoundException(`El recinto con ID ${idRecinto} no existe`);
      }
      evento.idRecinto = idRecinto;
    }

    if (updateDto.titulo !== undefined) {
      evento.titulo = updateDto.titulo.trim();
    }

    const artistaPrincipal = updateDto.artistaPrincipal;
    if (artistaPrincipal !== undefined) {
      evento.artistaPrincipal = artistaPrincipal.trim();
    }

    const duracionMinutos = updateDto.duracionMinutos;
    if (duracionMinutos !== undefined) {
      evento.duracionMinutos = duracionMinutos;
    }

    const precioEntrada = updateDto.precioEntrada;
    if (precioEntrada !== undefined) {
      evento.precioEntrada = Number(precioEntrada);
    }

    const fechaEvento = updateDto.fechaEvento;
    if (fechaEvento !== undefined) {
      evento.fechaEvento = fechaEvento;
    }

    if (updateDto.estado !== undefined) {
      evento.estado = updateDto.estado;
    }

    await this.eventosRepository.save(evento);
    return this.findOne(id);
  }

  async remove(id: number): Promise<EventoCultural> {
    const evento = await this.findOne(id);
    return this.eventosRepository.softRemove(evento);
  }
}
