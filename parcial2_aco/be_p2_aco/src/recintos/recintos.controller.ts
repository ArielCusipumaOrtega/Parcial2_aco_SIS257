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
import { CreateRecintoDto } from './dto/create-recinto.dto';
import { UpdateRecintoDto } from './dto/update-recinto.dto';
import { RecintosService } from './recintos.service';

@ApiTags('recintos')
@Controller('recintos')
export class RecintosController {
  constructor(private readonly recintosService: RecintosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo recinto' })
  create(@Body() createRecintoDto: CreateRecintoDto) {
    return this.recintosService.create(createRecintoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los recintos (ordenados alfabéticamente)' })
  findAll() {
    return this.recintosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un recinto por su ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.recintosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar parcialmente un recinto' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecintoDto: UpdateRecintoDto,
  ) {
    return this.recintosService.update(id, updateRecintoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (lógicamente) un recinto' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.recintosService.remove(id);
  }
}
