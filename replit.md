# Overview

This is a React-based version control testing application designed to help developers experiment with Git workflows, commit strategies, and deployment practices. The app provides an interactive interface with features like version tracking, commit history simulation, form handling, and settings management. It serves as a controlled environment for testing version control concepts without affecting real repositories.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**React SPA with TypeScript**: The application is built as a single-page React application using TypeScript for type safety. The frontend uses functional components with hooks for state management and follows modern React patterns.

**Routing**: Uses Wouter for lightweight client-side routing, providing navigation between Home, Features, Settings, and About pages without page refreshes.

**Component Library**: Implements Shadcn/UI components built on top of Radix UI primitives, providing a consistent design system with customizable components like buttons, forms, cards, and navigation elements.

**State Management**: Utilizes Zustand with persistence middleware for client-side state management, storing version information, commit history, and user settings in localStorage for data persistence across sessions.

**Styling**: TailwindCSS for utility-first styling with CSS variables for theming support. Custom design tokens are defined for colors, spacing, and typography with support for light/dark modes.

## Backend Architecture

**Express.js Server**: Node.js backend using Express with TypeScript support. The server is set up with middleware for JSON parsing, request logging, and error handling.

**Storage Interface**: Implements an abstraction layer with IStorage interface allowing for pluggable storage backends. Currently includes an in-memory storage implementation (MemStorage) for user data management.

**API Structure**: RESTful API design with routes prefixed under `/api` namespace, though specific endpoints are not yet implemented in the current codebase.

**Development Setup**: Uses tsx for development with hot reloading, and esbuild for production builds with ESM module format.

## Database Schema

**Drizzle ORM**: Uses Drizzle ORM with PostgreSQL dialect for database operations and schema management. The schema defines a users table with UUID primary keys, username, and password fields.

**Migration System**: Configured with Drizzle Kit for database migrations stored in the `/migrations` directory, enabling version-controlled database schema changes.

## Build System

**Vite**: Modern build tool for the frontend with React plugin support, hot module replacement, and optimized production builds. Configured with path aliases for clean imports.

**TypeScript**: Strict TypeScript configuration across both frontend and backend with ESNext modules and comprehensive type checking.

**Monorepo Structure**: Organized as a monorepo with `client/`, `server/`, and `shared/` directories for clear separation of concerns while enabling code sharing between frontend and backend.

# External Dependencies

## UI and Design System
- **Radix UI**: Headless UI primitives for accessible components
- **Shadcn/UI**: Pre-built component library with customizable design tokens
- **TailwindCSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography

## State Management and Data Fetching
- **Zustand**: Lightweight state management with persistence
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form handling with validation
- **Zod**: Schema validation for forms and API data

## Database and ORM
- **Neon Database**: Serverless PostgreSQL database provider
- **Drizzle ORM**: Type-safe ORM with migration support
- **Drizzle Kit**: CLI tool for database operations

## Development Tools
- **Vite**: Build tool and development server
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production
- **Replit Integration**: Development environment plugins for Replit platform

## Utilities
- **date-fns**: Date manipulation and formatting
- **clsx**: Conditional CSS class names
- **class-variance-authority**: Component variant management
- **nanoid**: Unique ID generation