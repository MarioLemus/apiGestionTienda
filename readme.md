# Gestion de tienda

Es una web donde los usuarios pueden crear y gestionar los recursos de una tienda, este proyecto está dirigido a pequeños emprendedores que estén en proceso de formalizar su negocio.

## Tabla de Contenidos

- [Descripción](#descripción)
- [Instalación](#instalación)
- [Uso](#uso)
- [Contribución](#contribución)
- [Autores](#autores)

## Descripción

Es una web donde los usuarios pueden crear y gestionar los recursos de su propia tienda desde inventarios, planillas y ventanilla virtual a través de la cual los clientes pueden interactuar con los productos de la tienda.

**Soluciona:**

- Facilita que los emprendedores puedan digitalizar su negocio con unos pocos clicks
- Facilita que los emprendedores puedan automatizar procesos
- Facilita que los emprendedores puedan fiscalizar sus gastos
- Facilita que los emprendedores puedan gestionar inventarios

## Instalación

Pasos para instalar y configurar el entorno de desarrollo.

```bash
# Clonar el repositorio
git clone https://github.com/MarioLemus/proyectoGestionTienda.git

# Entrar al directorio del proyecto
cd proyectoGestionTienda

# Instalar dependencias
npm install

### Requisitos Previos (recomendado)
- Node.js (20.14.0)
- npm (10.7.0)
```

## Uso

```bash
# Ejecutar el servidor de desarrollo
npm run dev

# Ejecutar el servidor
npm start

# Revisar si hay errores en el formato del codigo
npm run lint

# Revisar si hay errores en el formato del codigo y corregirlos todos
npm run lint:fix
```

## Contribución

### Tabla de verbos y su uso al nombrar ramas

| verbo     | Uso                                           |
|-----------|-----------------------------------------------|
| feature   | Trabajar en una funcionalidad nueva           |
| bugfix    | Reparar un bug                                |
| hotfix    | Reparar un bug critico en producción          |
| refactor  | Re-escribir, mejorar codigo existente         |
| docs      | Agregar documentación                         |
| test      | Agregar pruebas unitarias                     |
| style     | Realizar cambios en los estilos del codigo    |

### Formato de carpetas

```bash
|
|--controllers
|   |
|   |--ejemploControlador
|   |   |
|   |   |--index.js
|   |   |
|   |   |--index.test.js
|
|--utils
|   |
|   |--ejemploUtils
|   |   |
|   |   |--index.js
|   |   |
|   |   |--index.test.js
```

### Forma de trabajo

Instrucciones trabajo en ramas

- Crea una rama alterna a "main" con el siguiente formato "nombre_contribuyente:verbo_segun_tabla/objetivo_a_lograr"
  - Ejemplo: "milton:bugfix/arreglar-bug-servidor"
- Se realizara pull request una vez se haya completado el objetivo de la rama
- El nuevo codigo sobre el que se trabaje debe contener al menos 3 "tests" por funcion agregada (revisar lineamientos para hacer "pull request" abajo)
- Eliminar rama una vez finalizado el trabajo en esta

### Proceso de Pull Request

Instrucciones sobre cómo realizar una Pull Request de manera efectiva.

- Asegúrate de que tu código pase todas las pruebas
- Asegúrate de que tu código siga los estándares de estilo del proyecto
- Describe claramente qué cambios has hecho y por qué

## Autores

- **Mario Lemus** - *Contribución inicial* - [Perfil de GitHub](https://github.com/MarioLemus)
- **René** - *Desarrollo de características* - [Perfil de GitHub]()
- **Milton Flores** - *Corrección de errores* - [Perfil de GitHub]()
- **Ariel Amaya** - *Documentación* - [Perfil de GitHub]()