import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventoCulturalDto {
  @ApiPropertyOptional({ example: 1, description: 'ID del recinto' })
  @IsOptional()
  @IsInt({ message: 'El idRecinto debe ser un número entero' })
  @IsPositive({ message: 'El idRecinto debe ser mayor a 0' })
  readonly idRecinto?: number;

  @ApiProperty({ example: 'Concierto Sinfónico de Primavera', description: 'Título del evento cultural' })
  @IsNotEmpty({ message: 'El campo titulo es obligatorio' })
  @IsString({ message: 'El campo titulo debe ser una cadena de texto' })
  @MaxLength(150, { message: 'El campo titulo no debe exceder los 150 caracteres' })
  readonly titulo: string;

  @ApiPropertyOptional({ example: 'Orquesta Sinfónica Nacional', description: 'Artista o agrupación principal' })
  @IsOptional()
  @IsString({ message: 'El artista principal debe ser una cadena de texto' })
  @MaxLength(100, { message: 'El artista principal no debe exceder los 100 caracteres' })
  readonly artistaPrincipal?: string;

  @ApiPropertyOptional({ example: 120, description: 'Duración del evento en minutos' })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'La duración en minutos debe ser un número entero' })
  @Min(1, { message: 'La duración en minutos debe ser de al menos 1 minuto' })
  readonly duracionMinutos?: number;

  @ApiPropertyOptional({ example: 50.0, description: 'Precio de la entrada en Bs.' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'El precio de la entrada debe ser un número decimal válido' })
  @Min(0, { message: 'El precio de la entrada no puede ser negativo' })
  readonly precioEntrada?: number;

  @ApiPropertyOptional({ example: '2026-12-15', description: 'Fecha del evento en formato YYYY-MM-DD' })
  @IsOptional()
  @IsDateString({}, { message: 'La fecha del evento debe tener un formato de fecha válido (YYYY-MM-DD)' })
  readonly fechaEvento?: string;

  @ApiProperty({
    example: 'Programado',
    description: 'Estado del evento: Programado, Agotado o Cancelado',
    enum: ['Programado', 'Agotado', 'Cancelado'],
  })
  @IsNotEmpty({ message: 'El campo estado es obligatorio' })
  @IsIn(['Programado', 'Agotado', 'Cancelado'], {
    message: 'El estado debe ser uno de los siguientes valores: Programado, Agotado, Cancelado',
  })
  readonly estado: string;
}
