# CoffeeSea Frontend

An Angular-based frontend application.

## Project Structure

```
src/
  app/
    core/                 # Core functionality used throughout the app
      guards/             # Route guards
      interceptors/       # HTTP interceptors
      services/           # Singleton services
    shared/               # Shared modules and components
      components/         # Reusable UI components
      directives/         # Custom directives
      pipes/              # Custom pipes
    features/             # Feature modules
      home/               # Home feature
      products/           # Products feature
      cart/               # Cart feature
    app.component.ts      # Root component
    app.routes.ts         # Main routes
    app.config.ts         # App configuration
  assets/                 # Static assets
  environments/           # Environment configurations
```

## Structure Overview

- **Core Module**: Contains singleton services, interceptors, and guards that are loaded once at application startup
- **Shared Module**: Contains reusable components, directives, and pipes used across multiple features
- **Feature Modules**: Self-contained modules representing specific application features
  - Each feature can have its own components, services, and routes
  - Features can be lazy-loaded for better performance

## Key Angular Concepts for React Developers

- Components are split into separate files (.ts, .html, .css, .spec.ts)
- Services handle business logic and API calls (similar to custom hooks in React)
- Modules organize related code (though optional in newer Angular versions)
- Dependency injection is used extensively for services
- TypeScript is used throughout for type safety

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Visit http://localhost:4200/ to view the application.

## Development server

To start a local development server, run:

```bash
ng serve
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
