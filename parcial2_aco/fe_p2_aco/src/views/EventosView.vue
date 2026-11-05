<script setup lang="ts">
import EventoList from '@/components/evento/EventoList.vue'
import EventoSave from '@/components/evento/EventoSave.vue'
import type { EventoCultural } from '@/models/evento-cultural'
import Button from 'primevue/button'
import { ref } from 'vue'

const mostrarDialog = ref<boolean>(false)
const eventoListRef = ref<InstanceType<typeof EventoList> | null>(null)
const eventoEdit = ref<EventoCultural | null>(null)

function handleCreate() {
  eventoEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(evento: EventoCultural) {
  eventoEdit.value = evento
  mostrarDialog.value = true
}

function handleSave() {
  eventoListRef.value?.obtenerLista()
}

function handleCloseDialog() {
  mostrarDialog.value = false
}
</script>

<template>
  <div class="view-container">
    <div class="view-header">
      <div>
        <h1 class="view-title">Eventos Culturales</h1>
        <p class="view-subtitle">Programación y boletaje de actividades</p>
      </div>

      <Button
        label="Nuevo Evento"
        icon="pi pi-plus"
        class="btn-primary"
        @click="handleCreate"
      />
    </div>

    <EventoList ref="eventoListRef" @edit="handleEdit" />

    <EventoSave
      :mostrar="mostrarDialog"
      :evento="eventoEdit"
      :modoEdicion="!!eventoEdit"
      @guardar="handleSave"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped>
.view-container {
  width: 100%;
}

.view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  gap: 1rem;
}

.view-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  line-height: 1.2;
}

.view-subtitle {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin: 0.25rem 0 0 0;
}

.btn-primary {
  background-color: var(--primary-color) !important;
  color: #ffffff !important;
  border: none !important;
  border-radius: 6px !important;
  font-weight: 600 !important;
  padding: 0.5rem 1rem !important;
  font-size: 0.875rem !important;
}

.btn-primary:hover {
  background-color: var(--primary-hover) !important;
}
</style>
