<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-wrapper">
    <!-- Navbar simple y ultralimpia -->
    <header class="navbar">
      <div class="navbar-inner">
        <span class="app-title">Parcial 2 SIS257</span>
        <nav class="nav-tabs">
          <RouterLink to="/recintos" class="nav-tab" active-class="active">
            Recintos
          </RouterLink>
          <RouterLink to="/eventos-culturales" class="nav-tab" active-class="active">
            Eventos Culturales
          </RouterLink>
        </nav>
      </div>
    </header>

    <!-- Contenido principal -->
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: var(--surface-bg);
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--surface-card);
  border-bottom: 1px solid var(--border-color);
}

.navbar-inner {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.01em;
}

.nav-tabs {
  display: flex;
  gap: 0.5rem;
}

.nav-tab {
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-muted);
  padding: 0.45rem 1rem;
  border-radius: 6px;
  transition: all 0.15s ease-in-out;
  border: 1px solid transparent;
}

.nav-tab:hover {
  color: var(--text-primary);
  background-color: var(--surface-hover);
}

.nav-tab.active {
  color: #ffffff;
  background-color: var(--primary-color);
  font-weight: 600;
}

.main-content {
  flex: 1;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem;
}
</style>
