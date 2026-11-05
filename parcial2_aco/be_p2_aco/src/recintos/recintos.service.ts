import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecintoDto } from './dto/create-recinto.dto';
import { UpdateRecintoDto } from './dto/update-recinto.dto';
import { Recinto } from './entities/recinto.entity';

@Injectable()
export class RecintosService {
  constructor(
    @InjectRepository(Recinto)
    private readonly recintosRepository: Repository<Recinto>,
  ) {}

  async create(createRecintoDto: CreateRecintoDto): Promise<Recinto> {
    const existing = await this.recintosRepository.findOneBy({
      nombre: createRecintoDto.nombre.trim(),
      ciudad: createRecintoDto.ciudad.trim(),
    });
    if (existing) {
      throw new ConflictException('El recinto ya se encuentra registrado en esta ciudad');
    }

    const recinto = new Recinto();
    recinto.nombre = createRecintoDto.nombre.trim();
    recinto.ciudad = createRecintoDto.ciudad.trim();
    recinto.aforoMaximo =
      createRecintoDto.aforoMaximo ?? null;

    return this.recintosRepository.save(recinto);
  }

  async findAll(): Promise<Recinto[]> {
    return this.recintosRepository.find({
      order: { nombre: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Recinto> {
    const recinto = await this.recintosRepository.findOne({
      where: { id },
      relations: { eventosCulturales: true },
    });
    if (!recinto) {
      throw new NotFoundException(`El recinto con ID ${id} no existe`);
    }
    return recinto;
  }

  async update(id: number, updateRecintoDto: UpdateRecintoDto): Promise<Recinto> {
    const recinto = await this.findOne(id);

    if (updateRecintoDto.nombre !== undefined) {
      recinto.nombre = updateRecintoDto.nombre.trim();
    }
    if (updateRecintoDto.ciudad !== undefined) {
      recinto.ciudad = updateRecintoDto.ciudad.trim();
    }
    if (
      updateRecintoDto.aforoMaximo !== undefined
    ) {
      recinto.aforoMaximo =
        updateRecintoDto.aforoMaximo ?? null;
    }

    return this.recintosRepository.save(recinto);
  }

  async remove(id: number): Promise<Recinto> {
    const recinto = await this.findOne(id);
    return this.recintosRepository.softRemove(recinto);
  }
}
