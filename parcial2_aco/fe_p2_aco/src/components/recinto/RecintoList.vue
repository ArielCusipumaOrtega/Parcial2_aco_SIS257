<script setup lang="ts">
import type { Recinto } from '@/models/recinto'
import { computed, onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

const ENDPOINT = 'recintos'
const recintos = ref<Recinto[]>([])
const busqueda = ref<string>('')
const recintoDelete = ref<Recinto | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

const emit = defineEmits<{
  (e: 'edit', recinto: Recinto): void
}>()

async function obtenerLista() {
  try {
    const response = await http.get(ENDPOINT)
    recintos.value = response.data
  } catch (error) {
    console.error('Error al obtener la lista de recintos:', error)
  }
}

const recintosFiltrados = computed(() => {
  const query = busqueda.value.trim().toLowerCase()
  if (!query) return recintos.value
  return recintos.value.filter(
    (r) =>
      r.nombre.toLowerCase().includes(query) ||
      r.ciudad.toLowerCase().includes(query) ||
      (r.aforoMaximo?.toString() || '').includes(query),
  )
})

function emitirEdicion(recinto: Recinto) {
  emit('edit', recinto)
}

function mostrarEliminarConfirm(recinto: Recinto) {
  recintoDelete.value = recinto
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  if (!recintoDelete.value) return
  try {
    await http.delete(`${ENDPOINT}/${recintoDelete.value.id}`)
    await obtenerLista()
    mostrarConfirmDialog.value = false
    recintoDelete.value = null
  } catch (error) {
    console.error('Error al eliminar el recinto:', error)
    alert('No se pudo eliminar el recinto seleccionado.')
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
        placeholder="Buscar recinto por nombre, ciudad o aforo..."
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
            <th>Nombre del Recinto</th>
            <th>Ciudad</th>
            <th>Capacidad de Aforo</th>
            <th style="width: 110px; text-align: center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(recinto, index) in recintosFiltrados" :key="recinto.id">
            <td class="text-muted font-mono">{{ index + 1 }}</td>
            <td class="font-medium text-white">{{ recinto.nombre }}</td>
            <td>
              <span class="badge-neutral">{{ recinto.ciudad }}</span>
            </td>
            <td>
              <span v-if="recinto.aforoMaximo" class="text-white">
                {{ recinto.aforoMaximo.toLocaleString() }} personas
              </span>
              <span v-else class="text-muted fst-italic">No especificado</span>
            </td>
            <td class="text-center">
              <div class="action-buttons">
                <button
                  type="button"
                  class="btn-icon btn-edit"
                  title="Editar"
                  @click="emitirEdicion(recinto)"
                >
                  <i class="pi pi-pencil"></i>
                </button>
                <button
                  type="button"
                  class="btn-icon btn-delete"
                  title="Eliminar"
                  @click="mostrarEliminarConfirm(recinto)"
                >
                  <i class="pi pi-trash"></i>
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="recintosFiltrados.length === 0">
            <td colspan="5" class="empty-state">
              No se encontraron recintos que coincidan con la búsqueda.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Diálogo de Confirmación-->
    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Eliminar Recinto"
      :modal="true"
      :style="{ width: '90vw', maxWidth: '28rem' }"
    >
      <div class="py-2">
        <p class="m-0 text-white">
          ¿Estás seguro de eliminar el recinto <strong>{{ recintoDelete?.nombre }}</strong>?
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

.badge-neutral {
  display: inline-block;
  padding: 0.2rem 0.55rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 4px;
  background-color: var(--surface-elevated);
  color: var(--text-secondary);
  border: 1px solid var(--border-subtle);
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
