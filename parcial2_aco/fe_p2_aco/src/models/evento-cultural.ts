import type { Recinto } from './recinto'

export type EstadoEvento = 'Programado' | 'Agotado' | 'Cancelado'

export interface EventoCultural {
  id: number
  idRecinto?: number
  id_recinto?: number
  titulo: string
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
