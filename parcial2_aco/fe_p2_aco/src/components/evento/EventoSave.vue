<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import http from '@/plugins/axios'
import axios from 'axios'
import type { EventoCultural, EstadoEvento, CategoriaEvento } from '@/models/evento-cultural'
import type { Recinto } from '@/models/recinto'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'

const ENDPOINT = 'eventos-culturales'

const props = defineProps<{
  mostrar: boolean
  evento?: EventoCultural | null
  modoEdicion: boolean
}>()

const emit = defineEmits<{
  (e: 'guardar'): void
  (e: 'close'): void
}>()

const recintos = ref<Recinto[]>([])
const cargando = ref(false)
const errorMensaje = ref('')

// Opciones para categoria_evento
const opcionesCategoria: { label: string; value: CategoriaEvento }[] = [
  { label: 'Concierto', value: 'Concierto' },
  { label: 'Teatro', value: 'Teatro' },
  { label: 'Danza', value: 'Danza' },
  { label: 'Festival', value: 'Festival' },
]

const opcionesEstado: { label: string; value: EstadoEvento }[] = [
  { label: 'Programado', value: 'Programado' },
  { label: 'Agotado', value: 'Agotado' },
  { label: 'Cancelado', value: 'Cancelado' },
]

const form = ref<{
  id?: number
  idRecinto: number | null
  titulo: string
  categoria_evento: CategoriaEvento // Campo categoria_evento
  artistaPrincipal: string
  duracionMinutos: number | null
  precioEntrada: number | null
  fechaEvento: string
  estado: EstadoEvento
}>({
  idRecinto: null,
  titulo: '',
  categoria_evento: 'Concierto', // Valor inicial categoria_evento
  artistaPrincipal: '',
  duracionMinutos: 90,
  precioEntrada: 0,
  fechaEvento: (new Date().toISOString().split('T')[0] as string) || '',
  estado: 'Programado',
})

async function cargarRecintos() {
  try {
    const res = await http.get('recintos')
    recintos.value = res.data
  } catch (err) {
    console.error('Error al cargar recintos:', err)
  }
}

watch(
  () => props.mostrar,
  (visible) => {
    if (visible) {
      cargarRecintos()
      if (props.evento) {
        const ev = props.evento
        form.value = {
          id: ev.id,
          idRecinto: ev.idRecinto ?? ev.id_recinto ?? (ev.recinto?.id ?? null),
          titulo: ev.titulo,
          categoria_evento: ev.categoria_evento || 'Concierto', // Cargar categoria_evento
          artistaPrincipal: ev.artistaPrincipal ?? ev.artista_principal ?? '',
          duracionMinutos: ev.duracionMinutos ?? ev.duracion_minutos ?? 90,
          precioEntrada: Number(ev.precioEntrada ?? ev.precio_entrada ?? 0),
          fechaEvento: (ev.fechaEvento ?? ev.fecha_evento ?? (new Date().toISOString().split('T')[0] as string)) || '',
          estado: ev.estado,
        }
      } else {
        resetForm()
      }
    }
  },
  { immediate: true },
)

function resetForm() {
  const primerRecintoId = recintos.value.length > 0 && recintos.value[0] ? recintos.value[0].id : null
  form.value = {
    idRecinto: primerRecintoId,
    titulo: '',
    categoria_evento: 'Concierto', // Resetear categoria_evento
    artistaPrincipal: '',
    duracionMinutos: 90,
    precioEntrada: 0,
    fechaEvento: (new Date().toISOString().split('T')[0] as string) || '',
    estado: 'Programado',
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

  if (!form.value.titulo.trim()) {
    errorMensaje.value = 'El título del evento cultural es obligatorio.'
    return
  }
  // Validar categoria_evento
  if (!form.value.categoria_evento) {
    errorMensaje.value = 'Debe seleccionar una categoría para el evento.'
    return
  }
  if (!form.value.idRecinto) {
    errorMensaje.value = 'Debe seleccionar un recinto de la lista.'
    return
  }
  if (!form.value.artistaPrincipal.trim()) {
    errorMensaje.value = 'El artista principal es obligatorio.'
    return
  }
  if (!form.value.fechaEvento) {
    errorMensaje.value = 'La fecha del evento es obligatoria.'
    return
  }
  if (!form.value.duracionMinutos || form.value.duracionMinutos <= 0) {
    errorMensaje.value = 'La duración debe ser mayor a 0 minutos.'
    return
  }
  if (form.value.precioEntrada === null || form.value.precioEntrada === undefined || form.value.precioEntrada < 0) {
    errorMensaje.value = 'El precio no puede ser negativo.'
    return
  }
  if (!form.value.estado) {
    errorMensaje.value = 'Debe seleccionar un estado para el evento.'
    return
  }

  cargando.value = true
  try {
    const body = {
      idRecinto: form.value.idRecinto,
      titulo: form.value.titulo.trim(),
      categoria_evento: form.value.categoria_evento, // Asignar categoria_evento
      artistaPrincipal: form.value.artistaPrincipal.trim(),
      duracionMinutos: Number(form.value.duracionMinutos),
      precioEntrada: Number(form.value.precioEntrada),
      fechaEvento: form.value.fechaEvento,
      estado: form.value.estado,
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
      errorMensaje.value = 'Ocurrió un error al guardar el evento cultural.'
    }
  } finally {
    cargando.value = false
  }
}
</script>

<template>
  <Dialog
    v-model:visible="dialogVisible"
    :header="props.modoEdicion ? 'Editar Evento Cultural' : 'Nuevo Evento Cultural'"
    :modal="true"
    :style="{ width: '90vw', maxWidth: '38rem' }"
    @hide="emit('close')"
  >
    <div v-if="errorMensaje" class="form-error-alert mb-3">
      <i class="pi pi-exclamation-circle"></i>
      <span>{{ errorMensaje }}</span>
    </div>

    <form @submit.prevent="handleSave">
      <div class="field mb-3 flex flex-column gap-1">
        <label for="tituloEvento" class="form-label">
          Título del Evento <span class="text-red-400">*</span>
        </label>
        <InputText
          id="tituloEvento"
          v-model="form.titulo"
          class="w-full"
          placeholder="Ej. Festival Internacional de la Cultura"
          autocomplete="off"
          autofocus
        />
      </div>

      <div class="grid">
        <!-- Select de categoria_evento -->
        <div class="col-12 md:col-6">
          <div class="field mb-3 flex flex-column gap-1">
            <label for="categoriaEventoSelect" class="form-label">
              Categoría de Evento <span class="text-red-400">*</span>
            </label>
            <Select
              id="categoriaEventoSelect"
              v-model="form.categoria_evento"
              :options="opcionesCategoria"
              optionLabel="label"
              optionValue="value"
              placeholder="Seleccionar categoría..."
              class="w-full"
            />
          </div>
        </div>

        <div class="col-12 md:col-6">
          <div class="field mb-3 flex flex-column gap-1">
            <label for="recintoSelect" class="form-label">
              Recinto <span class="text-red-400">*</span>
            </label>
            <Select
              id="recintoSelect"
              v-model="form.idRecinto"
              :options="recintos"
              optionLabel="nombre"
              optionValue="id"
              placeholder="Seleccionar recinto..."
              class="w-full"
            />
          </div>
        </div>
      </div>

      <div class="grid">
        <div class="col-12 md:col-7">
          <div class="field mb-3 flex flex-column gap-1">
            <label for="artistaEvento" class="form-label">
              Artista o Agrupación Principal <span class="text-red-400">*</span>
            </label>
            <InputText
              id="artistaEvento"
              v-model="form.artistaPrincipal"
              class="w-full"
              placeholder="Ej. Los Kjarkas"
              autocomplete="off"
            />
          </div>
        </div>

        <div class="col-12 md:col-5">
          <div class="field mb-3 flex flex-column gap-1">
            <label for="estadoSelect" class="form-label">
              Estado <span class="text-red-400">*</span>
            </label>
            <Select
              id="estadoSelect"
              v-model="form.estado"
              :options="opcionesEstado"
              optionLabel="label"
              optionValue="value"
              placeholder="Seleccionar..."
              class="w-full"
            />
          </div>
        </div>
      </div>

      <div class="grid">
        <div class="col-12 md:col-4">
          <div class="field mb-3 flex flex-column gap-1">
            <label for="fechaEvento" class="form-label">
              Fecha <span class="text-red-400">*</span>
            </label>
            <input
              id="fechaEvento"
              v-model="form.fechaEvento"
              type="date"
              class="clean-date-input"
              required
            />
          </div>
        </div>

        <div class="col-12 md:col-4">
          <div class="field mb-3 flex flex-column gap-1">
            <label for="duracionEvento" class="form-label">
              Duración (minutos) <span class="text-red-400">*</span>
            </label>
            <InputNumber
              id="duracionEvento"
              v-model="form.duracionMinutos"
              class="w-full"
              placeholder="90"
              :min="1"
              :useGrouping="false"
            />
          </div>
        </div>

        <div class="col-12 md:col-4">
          <div class="field mb-3 flex flex-column gap-1">
            <label for="precioEvento" class="form-label">
              Precio Entrada (Bs.) <span class="text-red-400">*</span>
            </label>
            <InputNumber
              id="precioEvento"
              v-model="form.precioEntrada"
              class="w-full"
              placeholder="0.00"
              :min="0"
              :minFractionDigits="2"
              :maxFractionDigits="2"
            />
          </div>
        </div>
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
