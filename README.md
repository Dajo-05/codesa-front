# Codesa Front

Proyecto frontend Angular para la aplicación Codesa. Esta aplicación proporciona una interfaz simple para autenticación, gestión de proyectos y tareas.

## Estado
- Framework: Angular
- Lenguaje: TypeScript

## Requisitos
- Node.js >= 14
- npm >= 6

## Instalación
1. Clona el repositorio:

   git clone <repo-url>
2. Entra en el directorio del proyecto:

   cd codesa-front
3. Instala dependencias:

   npm install

## Desarrollo

Inicia el servidor de desarrollo (por defecto en http://localhost:4200):

```bash
ng serve --proxy-config proxy.conf.json   
```

## Estructura principal

- `src/app`: código de la aplicación
  - `pages/login`: componente de login
  - `pages/proyectos`: lista de proyectos
  - `pages/tareas`: lista y detalle de tareas
  - `services`: servicios para `auth`, `proyecto` y `tarea`
  - `models`: modelos `auth`, `proyecto`, `tarea`
  - `interceptors`: `auth.interceptor.ts` para añadir token a peticiones
  - `guards`: `auth.guard.ts` para proteger rutas

## Configuración de proxy (API)
El proyecto incluye `proxy.conf.json` para redirigir llamadas API en desarrollo. Ajusta la URL del backend según corresponda.

## Tests

Ejecuta las pruebas con:

```bash
npm test
```

## Contribuir

1. Crea una rama con tu feature o fix: `git checkout -b feature/mi-cambio`
2. Haz commits claros y descriptivos.
3. Abre un Pull Request describiendo los cambios.

## Licencia
Indica aquí la licencia del proyecto (p. ej. MIT) o añade un archivo `LICENSE` en la raíz.

---
Si quieres, puedo ampliar este `README.md` con instrucciones de despliegue, variables de entorno necesarias y ejemplos de uso de la API.
# CodesaFront

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.5.

## Development server

To start a local development server, run:

```bash
ng serve --proxy-config proxy.conf.json   
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
