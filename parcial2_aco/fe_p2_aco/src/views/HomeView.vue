<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'
import Card from 'primevue/card'
</script>

<template>
  <div class="google-home w-full">
    <!-- Google Arts & Culture Style Hero Card -->
    <div class="google-hero-card p-5 md:p-6 mb-4">
      <div class="max-w-4rem mb-3">
        <span class="google-pill-chip">
          <i class="pi pi-sparkles text-xs mr-1 text-yellow-400"></i>
          Patrimonio & Cultura · Sucre, Bolivia
        </span>
      </div>

      <h1 class="hero-heading font-google text-white mb-2">
        Agenda Cultural y Boletaje
      </h1>
      <p class="hero-subheading text-secondary mb-4 max-w-40rem line-height-3">
        Explora la cartelera oficial de eventos artísticos, conciertos y espectáculos en la Ciudad Blanca de América.
        Gestiona teatros y recintos históricos con la fluidez y simplicidad de Google.
      </p>

      <div class="flex flex-wrap gap-3">
        <RouterLink to="/eventos-culturales" class="no-underline">
          <Button
            label="Ver Cartelera de Eventos"
            icon="pi pi-ticket"
            class="m3-btn-filled"
          />
        </RouterLink>
        <RouterLink to="/recintos" class="no-underline">
          <Button
            label="Explorar Recintos"
            icon="pi pi-building"
            class="m3-btn-tonal"
          />
        </RouterLink>
      </div>
    </div>

    <!-- Módulos en Grid Material 3 -->
    <div class="grid">
      <!-- Card Recintos -->
      <div class="col-12 lg:col-6">
        <Card class="m3-card h-full">
          <template #title>
            <div class="flex align-items-center gap-3">
              <div class="m3-icon-box bg-red-soft">
                <i class="pi pi-building text-xl" style="color: var(--gm-red)"></i>
              </div>
              <div>
                <h3 class="m-0 text-xl font-google font-semibold text-white">
                  Recintos Escénicos
                </h3>
                <span class="text-xs text-secondary">Teatros, escenarios y aforos de Sucre</span>
              </div>
            </div>
          </template>
          <template #content>
            <p class="text-secondary line-height-3 mb-4">
              Administración de espacios icónicos como el <strong class="text-white">Teatro Gran Mariscal</strong>,
              <strong class="text-white">Orígenes</strong> y el <strong class="text-white">Estadio Patria</strong>.
              Control de ubicación, capacidad máxima de asistentes y soft delete seguro.
            </p>
            <div class="flex align-items-center justify-content-between pt-3 border-top-1 surface-border">
              <span class="text-xs text-tertiary">Gestión completa de entidades</span>
              <RouterLink to="/recintos" class="no-underline">
                <Button label="Gestionar Recintos" icon="pi pi-arrow-right" iconPos="right" text class="m3-text-btn" />
              </RouterLink>
            </div>
          </template>
        </Card>
      </div>

      <!-- Card Eventos Culturales -->
      <div class="col-12 lg:col-6">
        <Card class="m3-card h-full">
          <template #title>
            <div class="flex align-items-center gap-3">
              <div class="m3-icon-box bg-blue-soft">
                <i class="pi pi-ticket text-xl" style="color: var(--gm-blue)"></i>
              </div>
              <div>
                <h3 class="m-0 text-xl font-google font-semibold text-white">
                  Eventos & Boletaje
                </h3>
                <span class="text-xs text-secondary">Programación y taquilla en tiempo real</span>
              </div>
            </div>
          </template>
          <template #content>
            <p class="text-secondary line-height-3 mb-4">
              Control integral de obras, artistas principales, duración en minutos, tarifas en Bolivianos (Bs.)
              y estado de boletaje (<span class="text-green-400">Programado</span>,
              <span class="text-red-400">Agotado</span>, <span class="text-gray-400">Cancelado</span>)
              mediante selector interactivo.
            </p>
            <div class="flex align-items-center justify-content-between pt-3 border-top-1 surface-border">
              <span class="text-xs text-tertiary">Select de estado obligatorio</span>
              <RouterLink to="/eventos-culturales" class="no-underline">
                <Button label="Ir a Eventos" icon="pi pi-arrow-right" iconPos="right" text class="m3-text-btn" />
              </RouterLink>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.google-hero-card {
  background: linear-gradient(135deg, #1e222b 0%, #17191f 100%);
  border: 1px solid var(--gm-outline-variant);
  border-radius: 28px;
  position: relative;
  overflow: hidden;
}

.google-pill-chip {
  background: var(--gm-surface-container-highest);
  color: var(--gm-text-primary);
  border: 1px solid var(--gm-outline);
  padding: 0.35rem 0.9rem;
  border-radius: 9999px;
  font-size: 0.78rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}

.hero-heading {
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.hero-subheading {
  color: var(--gm-text-secondary);
  font-size: 1.02rem;
}

.m3-btn-filled {
  background: var(--gm-blue) !important;
  color: #131314 !important;
  border-radius: 9999px !important;
  font-weight: 600 !important;
  border: none !important;
  padding: 0.75rem 1.6rem !important;
}

.m3-btn-filled:hover {
  background: var(--gm-blue-hover) !important;
  box-shadow: 0 1px 8px rgba(138, 180, 248, 0.4) !important;
}

.m3-btn-tonal {
  background: var(--gm-surface-container-high) !important;
  color: var(--gm-text-primary) !important;
  border-radius: 9999px !important;
  border: 1px solid var(--gm-outline) !important;
  font-weight: 500 !important;
  padding: 0.75rem 1.6rem !important;
}

.m3-btn-tonal:hover {
  background: var(--gm-surface-container-highest) !important;
}

.m3-card {
  border-radius: 24px !important;
  background: var(--gm-surface-container) !important;
  border: 1px solid var(--gm-outline-variant) !important;
}

.m3-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-red-soft {
  background: var(--gm-red-container);
}

.bg-blue-soft {
  background: var(--gm-blue-container);
}

.m3-text-btn {
  color: var(--gm-blue) !important;
  font-weight: 600 !important;
}

.no-underline {
  text-decoration: none;
}
</style>
