<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import http from '@/plugins/axios'
import axios from 'axios'
import type { Recinto } from '@/models/recinto'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'

const ENDPOINT = 'recintos'

const props = defineProps<{
  mostrar: boolean
  recinto?: Recinto | null
  modoEdicion: boolean
}>()

const emit = defineEmits<{
  (e: 'guardar'): void
  (e: 'close'): void
}>()

const form = ref<{
  id?: number
  nombre: string
  ciudad: string
  aforoMaximo: number | null
}>({
  nombre: '',
  ciudad: '',
  aforoMaximo: null,
})

const cargando = ref(false)
const errorMensaje = ref('')

watch(
  () => props.recinto,
  (newVal) => {
    if (newVal) {
      form.value = {
        id: newVal.id,
        nombre: newVal.nombre,
        ciudad: newVal.ciudad,
        aforoMaximo: newVal.aforoMaximo ?? newVal.aforo_maximo ?? null,
      }
    } else {
      resetForm()
    }
  },
  { immediate: true },
)

function resetForm() {
  form.value = {
    nombre: '',
    ciudad: '',
    aforoMaximo: null,
  }
  errorMensaje.value = ''
}

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (val) => {
    if (!val) {
      emit('close')
    }
  },
})

async function handleSave() {
  errorMensaje.value = ''

  if (!form.value.nombre.trim()) {
    errorMensaje.value = 'El nombre del recinto es obligatorio.'
    return
  }
  if (!form.value.ciudad.trim()) {
    errorMensaje.value = 'La ciudad es obligatoria.'
    return
  }

  cargando.value = true
  try {
    const body = {
      nombre: form.value.nombre.trim(),
      ciudad: form.value.ciudad.trim(),
      aforoMaximo: form.value.aforoMaximo ?? undefined,
    }

    if (props.modoEdicion && form.value.id) {
      await http.patch(`${ENDPOINT}/${form.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }

    emit('guardar')
    resetForm()
    emit('close')
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const msg = error.response?.data?.message
      errorMensaje.value = Array.isArray(msg) ? msg.join(', ') : (msg ?? error.message)
    } else {
      errorMensaje.value = 'Ocurrió un error al guardar el recinto.'
    }
  } finally {
    cargando.value = false
  }
}
</script>

<template>
  <Dialog
    v-model:visible="dialogVisible"
    :header="props.modoEdicion ? 'Editar Recinto' : 'Nuevo Recinto'"
    :modal="true"
    :style="{ width: '90vw', maxWidth: '30rem' }"
    @hide="emit('close')"
  >
    <div v-if="errorMensaje" class="form-error-alert mb-3">
      <i class="pi pi-exclamation-circle"></i>
      <span>{{ errorMensaje }}</span>
    </div>

    <form @submit.prevent="handleSave">
      <div class="field mb-3 flex flex-column gap-1">
        <label for="nombreRecinto" class="form-label">
          Nombre del Recinto <span class="text-red-400">*</span>
        </label>
        <InputText
          id="nombreRecinto"
          v-model="form.nombre"
          class="w-full"
          placeholder="Ej. Estadio Patria"
          autocomplete="off"
          autofocus
        />
      </div>

      <div class="field mb-3 flex flex-column gap-1">
        <label for="ciudadRecinto" class="form-label">
          Ciudad <span class="text-red-400">*</span>
        </label>
        <InputText
          id="ciudadRecinto"
          v-model="form.ciudad"
          class="w-full"
          placeholder="Ej. Sucre"
          autocomplete="off"
        />
      </div>

      <div class="field mb-3 flex flex-column gap-1">
        <label for="aforoRecinto" class="form-label">
          Aforo Máximo <span class="text-muted font-normal">(opcional)</span>
        </label>
        <InputNumber
          id="aforoRecinto"
          v-model="form.aforoMaximo"
          class="w-full"
          placeholder="Ej. 100"
          :min="0"
          :useGrouping="false"
        />
      </div>

      <div class="flex justify-content-end gap-2 mt-4 pt-3 border-top-1 border-gray-800">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          text
          @click="emit('close')"
        />
        <Button
          type="submit"
          :label="props.modoEdicion ? 'Actualizar' : 'Guardar'"
          class="btn-save"
          :loading="cargando"
        />
      </div>
    </form>
  </Dialog>
</template>

<style scoped>
.btn-save {
  background-color: var(--primary-color) !important;
  color: #ffffff !important;
  border: none !important;
  border-radius: 6px !important;
  font-weight: 600 !important;
  padding: 0.5rem 1.25rem !important;
}

.btn-save:hover {
  background-color: var(--primary-hover) !important;
}
</style>
