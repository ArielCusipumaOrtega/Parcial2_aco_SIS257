import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Recinto } from '../../recintos/entities/recinto.entity';

export enum EstadoEvento {
  PROGRAMADO = 'Programado',
  AGOTADO = 'Agotado',
  CANCELADO = 'Cancelado',
}

@Entity('eventos_culturales')
export class EventoCultural {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer', { name: 'id_recinto' })
  idRecinto: number;

  @Column('varchar', { length: 150 })
  titulo: string;

  @Column('varchar', { name: 'artista_principal', length: 100 })
  artistaPrincipal: string;

  @Column('integer', { name: 'duracion_minutos' })
  duracionMinutos: number;

  @Column('decimal', { name: 'precio_entrada', precision: 10, scale: 2 })
  precioEntrada: number;

  @Column('date', { name: 'fecha_evento' })
  fechaEvento: string;

  @Column('varchar', { length: 20 })
  estado: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @ManyToOne(() => Recinto, recinto => recinto.eventosCulturales)
  @JoinColumn({ name: 'id_recinto', referencedColumnName: 'id' })
  recinto: Recinto;
}
