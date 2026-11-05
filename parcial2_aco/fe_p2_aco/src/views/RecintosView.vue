<script setup lang="ts">
import RecintoList from '@/components/recinto/RecintoList.vue'
import RecintoSave from '@/components/recinto/RecintoSave.vue'
import type { Recinto } from '@/models/recinto'
import Button from 'primevue/button'
import { ref } from 'vue'

const mostrarDialog = ref<boolean>(false)
const recintoListRef = ref<InstanceType<typeof RecintoList> | null>(null)
const recintoEdit = ref<Recinto | null>(null)

function handleCreate() {
  recintoEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(recinto: Recinto) {
  recintoEdit.value = recinto
  mostrarDialog.value = true
}

function handleSave() {
  recintoListRef.value?.obtenerLista()
}

function handleCloseDialog() {
  mostrarDialog.value = false
}
</script>

<template>
  <div class="view-container">
    <div class="view-header">
      <div>
        <h1 class="view-title">Recintos</h1>
        <p class="view-subtitle">Gestión de teatros, auditorios y escenarios</p>
      </div>

      <Button
        label="Nuevo Recinto"
        icon="pi pi-plus"
        class="btn-primary"
        @click="handleCreate"
      />
    </div>

    <RecintoList ref="recintoListRef" @edit="handleEdit" />

    <RecintoSave
      :mostrar="mostrarDialog"
      :recinto="recintoEdit"
      :modoEdicion="!!recintoEdit"
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
