# Backend - be_p2_aco (SIS257 Segundo Parcial)

API REST para la **Agenda y Boletaje de Eventos Culturales**, desarrollada con **NestJS**, **TypeORM** y **PostgreSQL**.

---

## 🛠️ Tecnologías y Herramientas

- **Framework**: NestJS v12
- **ORM**: TypeORM v1.1
- **Base de Datos**: PostgreSQL 18
- **Validaciones**: `class-validator`, `class-transformer`
- **Documentación API**: Swagger / OpenAPI (`/api/docs`)
- **Arquitectura**: Clean Architecture orientada a objetos (Entidades, DTOs, Servicios, Controladores, Módulos).

---

## 🗄️ Base de Datos y Credenciales

- **Motor**: PostgreSQL
- **Host**: `localhost`
- **Puerto**: `5432`
- **Usuario**: `usrparcial2`
- **Contraseña**: `P4rc14L2-2026`
- **Base de Datos**: `parcial2_aco`

### Tablas Generadas

#### `recintos`
| Campo | Tipo | Restricción | Descripción |
|---|---|---|---|
| `id` | INTEGER | PRIMARY KEY (identity) | Identificador auto numérico |
| `nombre` | VARCHAR(100) | NOT NULL | Nombre del recinto (Ej. Teatro Gran Mariscal) |
| `ciudad` | VARCHAR(50) | NOT NULL | Ciudad del recinto |
| `aforo_maximo` | INTEGER | NULL | Capacidad máxima (opcional) |
| `fecha_creacion` | TIMESTAMP | NOT NULL (now()) | Fecha de auditoría |
| `fecha_modificacion` | TIMESTAMP | NOT NULL (now()) | Fecha de auditoría |
| `fecha_eliminacion` | TIMESTAMP | NULL | Borrado lógico (soft delete) |

#### `eventos_culturales`
| Campo | Tipo | Restricción | Descripción |
|---|---|---|---|
| `id` | INTEGER | PRIMARY KEY (identity) | Identificador auto numérico |
| `id_recinto` | INTEGER | NOT NULL (FK -> `recintos.id`) | Relación con el recinto |
| `titulo` | VARCHAR(150) | NOT NULL | Título del evento cultural |
| `artista_principal` | VARCHAR(100) | NOT NULL | Artista o agrupación principal |
| `duracion_minutos` | INTEGER | NOT NULL | Duración en minutos |
| `precio_entrada` | NUMERIC(10,2) | NOT NULL | Precio de la entrada |
| `fecha_evento` | DATE | NOT NULL | Fecha de realización |
| `estado` | VARCHAR(20) | NOT NULL | Enum: `'Programado'`, `'Agotado'`, `'Cancelado'` |
| `fecha_creacion` | TIMESTAMP | NOT NULL (now()) | Fecha de auditoría |
| `fecha_modificacion` | TIMESTAMP | NOT NULL (now()) | Fecha de auditoría |
| `fecha_eliminacion` | TIMESTAMP | NULL | Borrado lógico (soft delete) |

---

## 🚀 Endpoints de la API REST

Prefijo global: `/api/v1`
Documentación interactiva Swagger: `http://localhost:3000/api/docs`

### Recintos (`/api/v1/recintos`)
- **POST `/api/v1/recintos`**: Crear recinto.
- **GET `/api/v1/recintos`**: Listar todos los recintos (ordenados alfabéticamente).
- **GET `/api/v1/recintos/:id`**: Obtener un recinto por ID con sus eventos asociados.
- **PATCH `/api/v1/recintos/:id`**: Actualización parcial de un recinto.
- **DELETE `/api/v1/recintos/:id`**: Borrado lógico (soft delete).

### Eventos Culturales (`/api/v1/eventos-culturales`)
- **POST `/api/v1/eventos-culturales`**: Crear evento cultural.
- **GET `/api/v1/eventos-culturales`**: Listar todos los eventos culturales con su relación al recinto (ordenados alfabéticamente por título).
- **GET `/api/v1/eventos-culturales/:id`**: Obtener un evento por ID con su recinto.
- **PATCH `/api/v1/eventos-culturales/:id`**: Actualización parcial de un evento.
- **DELETE `/api/v1/eventos-culturales/:id`**: Borrado lógico (soft delete).

---

## 📦 Ejecución del Backend

```bash
# Instalar dependencias (si no estuvieran)
npm install

# Compilar proyecto
npm run build

# Iniciar en modo desarrollo con recarga en caliente
npm run start:dev

# Iniciar en modo producción
npm run start:prod
```
