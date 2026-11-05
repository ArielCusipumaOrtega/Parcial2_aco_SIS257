<script setup lang="ts">
import type { EventoCultural } from '@/models/evento-cultural'
import { computed, onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

const ENDPOINT = 'eventos-culturales'
const eventos = ref<EventoCultural[]>([])
const busqueda = ref<string>('')
const eventoDelete = ref<EventoCultural | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

const emit = defineEmits<{
  (e: 'edit', evento: EventoCultural): void
}>()

async function obtenerLista() {
  try {
    const response = await http.get(ENDPOINT)
    eventos.value = response.data
  } catch (error) {
    console.error('Error al obtener lista de eventos culturales:', error)
  }
}

const eventosFiltrados = computed(() => {
  const query = busqueda.value.trim().toLowerCase()
  if (!query) return eventos.value
  return eventos.value.filter((e) => {
    const titulo = e.titulo.toLowerCase()
    const artista = (e.artistaPrincipal ?? e.artista_principal ?? '').toLowerCase()
    const recinto = (e.recinto?.nombre ?? '').toLowerCase()
    const ciudad = (e.recinto?.ciudad ?? '').toLowerCase()
    const estado = e.estado.toLowerCase()
    const fecha = (e.fechaEvento ?? e.fecha_evento ?? '').toLowerCase()
    return (
      titulo.includes(query) ||
      artista.includes(query) ||
      recinto.includes(query) ||
      ciudad.includes(query) ||
      estado.includes(query) ||
      fecha.includes(query)
    )
  })
})

function emitirEdicion(evento: EventoCultural) {
  emit('edit', evento)
}

function mostrarEliminarConfirm(evento: EventoCultural) {
  eventoDelete.value = evento
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  if (!eventoDelete.value) return
  try {
    await http.delete(`${ENDPOINT}/${eventoDelete.value.id}`)
    await obtenerLista()
    mostrarConfirmDialog.value = false
    eventoDelete.value = null
  } catch (error) {
    console.error('Error al eliminar evento cultural:', error)
    alert('No se pudo eliminar el evento cultural seleccionado.')
  }
}

onMounted(() => {
  obtenerLista()
})

defineExpose({ obtenerLista })
</script>

<template>
  <div class="list-container">
    <!-- Buscador simple -->
    <div class="search-bar">
      <i class="pi pi-search search-icon"></i>
      <input
        v-model="busqueda"
        type="text"
        placeholder="Buscar evento por título, artista, recinto, fecha o estado..."
        class="search-input"
      />
      <button
        v-if="busqueda"
        type="button"
        class="search-clear-btn"
        @click="busqueda = ''"
      >
        <i class="pi pi-times"></i>
      </button>
    </div>

    <!-- Tabla -->
    <div class="table-card">
      <table class="clean-table">
        <thead>
          <tr>
            <th style="width: 50px">#</th>
            <th>Título del Evento</th>
            <th>Artista / Elenco</th>
            <th>Recinto & Ciudad</th>
            <th>Fecha</th>
            <th style="text-align: center">Duración</th>
            <th style="text-align: right">Precio</th>
            <th style="text-align: center">Estado</th>
            <th style="width: 110px; text-align: center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(evento, index) in eventosFiltrados" :key="evento.id">
            <td class="text-muted font-mono">{{ index + 1 }}</td>
            <td class="font-medium text-white">{{ evento.titulo }}</td>
            <td class="text-secondary">
              {{ evento.artistaPrincipal ?? evento.artista_principal }}
            </td>
            <td>
              <span v-if="evento.recinto">
                <span class="text-white block font-medium">{{ evento.recinto.nombre }}</span>
                <small class="text-muted block">{{ evento.recinto.ciudad }}</small>
              </span>
              <span v-else class="text-muted">ID: {{ evento.idRecinto ?? evento.id_recinto }}</span>
            </td>
            <td class="text-secondary">
              {{ evento.fechaEvento ?? evento.fecha_evento }}
            </td>
            <td class="text-center text-secondary">
              {{ evento.duracionMinutos ?? evento.duracion_minutos }} min
            </td>
            <td class="text-right font-medium text-white">
              Bs. {{ Number(evento.precioEntrada ?? evento.precio_entrada ?? 0).toFixed(2) }}
            </td>
            <td class="text-center">
              <span
                class="status-badge"
                :class="{
                  'badge-success': evento.estado === 'Programado',
                  'badge-warning': evento.estado === 'Agotado',
                  'badge-danger': evento.estado === 'Cancelado',
                }"
              >
                {{ evento.estado }}
              </span>
            </td>
            <td class="text-center">
              <div class="action-buttons">
                <button
                  type="button"
                  class="btn-icon btn-edit"
                  title="Editar"
                  @click="emitirEdicion(evento)"
                >
                  <i class="pi pi-pencil"></i>
                </button>
                <button
                  type="button"
                  class="btn-icon btn-delete"
                  title="Eliminar"
                  @click="mostrarEliminarConfirm(evento)"
                >
                  <i class="pi pi-trash"></i>
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="eventosFiltrados.length === 0">
            <td colspan="9" class="empty-state">
              No se encontraron eventos culturales registrados.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Diálogo de Confirmación -->
    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Eliminar Evento Cultural"
      :modal="true"
      :style="{ width: '90vw', maxWidth: '28rem' }"
    >
      <div class="py-2">
        <p class="m-0 text-white">
          ¿Estás seguro de eliminar el evento <strong>{{ eventoDelete?.titulo }}</strong>?
        </p>
      </div>
      <template #footer>
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          text
          @click="mostrarConfirmDialog = false"
        />
        <Button
          type="button"
          label="Eliminar"
          class="btn-danger-action"
          @click="eliminar"
        />
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
.list-container {
  width: 100%;
}

.search-bar {
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 1rem;
  background-color: var(--surface-card);
  border: 1px solid var(--border-subtle);
  border-radius: 6px;
  padding: 0 0.85rem;
  height: 42px;
}

.search-icon {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-right: 0.6rem;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.search-input::placeholder {
  color: var(--text-tertiary);
}

.search-clear-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.25rem;
}

.search-clear-btn:hover {
  color: var(--text-primary);
}

.table-card {
  width: 100%;
  overflow-x: auto;
  background-color: var(--surface-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
}

.clean-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.clean-table th {
  background-color: var(--surface-elevated);
  color: var(--text-muted);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border-subtle);
}

.clean-table td {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid var(--border-color);
  font-size: 0.875rem;
  color: var(--text-primary);
}

.clean-table tr:hover td {
  background-color: rgba(255, 255, 255, 0.02);
}

.status-badge {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 4px;
}

.badge-success {
  background-color: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.badge-warning {
  background-color: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.badge-danger {
  background-color: rgba(239, 68, 68, 0.15);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 0.4rem;
}

.btn-icon {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: transparent;
  border: 1px solid transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.15s ease;
}

.btn-edit {
  color: #60a5fa;
}

.btn-edit:hover {
  background-color: rgba(96, 165, 250, 0.1);
  border-color: rgba(96, 165, 250, 0.3);
}

.btn-delete {
  color: #f87171;
}

.btn-delete:hover {
  background-color: rgba(248, 113, 113, 0.1);
  border-color: rgba(248, 113, 113, 0.3);
}

.empty-state {
  text-align: center;
  padding: 2.5rem 1rem !important;
  color: var(--text-muted);
}

.btn-danger-action {
  background-color: var(--danger-color) !important;
  color: #ffffff !important;
  border: none !important;
  border-radius: 6px !important;
  font-weight: 600 !important;
  padding: 0.45rem 1rem !important;
}

.btn-danger-action:hover {
  background-color: var(--danger-hover) !important;
}

.font-mono {
  font-family: monospace;
}
</style>
