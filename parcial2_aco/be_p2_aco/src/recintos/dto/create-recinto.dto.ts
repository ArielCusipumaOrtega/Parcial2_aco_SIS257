import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateRecintoDto {
  @ApiProperty({ example: 'Teatro Gran Mariscal', description: 'Nombre del recinto' })
  @IsNotEmpty({ message: 'El campo nombre es obligatorio' })
  @IsString({ message: 'El campo nombre debe ser una cadena de texto' })
  @MaxLength(100, { message: 'El campo nombre no debe exceder los 100 caracteres' })
  readonly nombre: string;

  @ApiProperty({ example: 'Sucre', description: 'Ciudad donde se encuentra el recinto' })
  @IsNotEmpty({ message: 'El campo ciudad es obligatorio' })
  @IsString({ message: 'El campo ciudad debe ser una cadena de texto' })
  @MaxLength(50, { message: 'El campo ciudad no debe exceder los 50 caracteres' })
  readonly ciudad: string;

  @ApiPropertyOptional({ example: 800, description: 'Aforo máximo del recinto (opcional)' })
  @IsOptional()
  @IsInt({ message: 'El aforo máximo debe ser un número entero' })
  @Min(0, { message: 'El aforo máximo no puede ser un número negativo' })
  readonly aforoMaximo?: number;

}
