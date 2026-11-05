# Frontend - fe_p2_aco (SIS257 Segundo Parcial)

Aplicación web frontend para la **Agenda y Boletaje de Eventos Culturales**, desarrollada con **Vue 3**, **Vite**, **TypeScript** y **PrimeVue**.

---

## 🛠️ Tecnologías y Librerías

- **Framework**: Vue 3 (Composition API, `<script setup>`, TypeScript)
- **Tooling**: Vite 8
- **Biblioteca UI**: PrimeVue v5 (Tema Aura)
- **Iconografía**: PrimeIcons v8
- **Grid y Utilitarios**: PrimeFlex v4
- **Cliente HTTP**: Axios (configurado contra el endpoint backend `/api/v1`)
- **Enrutamiento**: Vue Router 5
- **Gestión de Estado**: Pinia

---

## 💻 Características del Sistema

1. **Gestión Completa de Recintos (`/recintos`)**:
   - Listado interactivo con búsqueda en tiempo real por nombre, ciudad o aforo.
   - Modal emergente (`PrimeVue Dialog`) para creación y edición de recintos.
   - Confirmación modal previa antes de la eliminación lógica.

2. **Gestión de Eventos Culturales y Boletaje (`/eventos-culturales`)**:
   - Listado en tabla con relaciones detalladas: Recinto vinculado, artista principal, fecha, duración, precio formateado en Bs. y badges visuales para el estado.
   - Formulario modal con:
     - Selección de recinto mediante componente `Select` dinámico cargado desde la API.
     - **Selección de estado mediante `Select` obligatorio** con opciones: `Programado`, `Agotado`, `Cancelado`.
     - Inputs validados para título, artista principal, fecha, duración y precio.
   - Búsqueda en tiempo real por múltiples criterios (título, artista, recinto, fecha, estado).
   - Confirmación modal de eliminación con soft delete.

3. **Navegación e Interfaz**:
   - Barra de navegación moderna para cambiar entre Inicio, Recintos y Eventos Culturales.

---

## 🚀 Ejecución del Frontend

```bash
# Instalar dependencias (si no estuvieran)
npm install

# Iniciar servidor de desarrollo (por defecto en http://localhost:5173)
npm run dev

# Compilar y validar tipos para producción
npm run build
```
