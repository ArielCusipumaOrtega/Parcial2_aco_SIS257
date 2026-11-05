import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateEventoCulturalDto } from './dto/create-evento-cultural.dto';
import { UpdateEventoCulturalDto } from './dto/update-evento-cultural.dto';
import { EventosCulturalesService } from './eventos-culturales.service';

@ApiTags('eventos-culturales')
@Controller('eventos-culturales')
export class EventosCulturalesController {
  constructor(
    private readonly eventosCulturalesService: EventosCulturalesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo evento cultural' })
  create(@Body() createEventoCulturalDto: CreateEventoCulturalDto) {
    return this.eventosCulturalesService.create(createEventoCulturalDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los eventos culturales (ordenados)' })
  findAll() {
    return this.eventosCulturalesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un evento cultural por su ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventosCulturalesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar parcialmente un evento cultural' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventoCulturalDto: UpdateEventoCulturalDto,
  ) {
    return this.eventosCulturalesService.update(id, updateEventoCulturalDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (lógicamente) un evento cultural' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.eventosCulturalesService.remove(id);
  }
}
