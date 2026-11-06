import type { Recinto } from './recinto'

export type EstadoEvento = 'Programado' | 'Agotado' | 'Cancelado'
// Opciones para categoria_evento
export type CategoriaEvento = 'Concierto' | 'Teatro' | 'Danza' | 'Festival'

export interface EventoCultural {
  id: number
  idRecinto?: number
  id_recinto?: number
  titulo: string
  categoria_evento: CategoriaEvento // Campo categoria_evento
  artistaPrincipal?: string
  artista_principal?: string
  duracionMinutos?: number
  duracion_minutos?: number
  precioEntrada?: number | string
  precio_entrada?: number | string
  fechaEvento?: string
  fecha_evento?: string
  estado: EstadoEvento
  fechaCreacion?: string
  fechaModificacion?: string
  fechaEliminacion?: string | null
  recinto?: Recinto
}
