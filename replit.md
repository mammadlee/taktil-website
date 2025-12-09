# TactileOne - Accessible Products Website

## Overview

TactileOne is a modern, accessible e-commerce showcase website for a company selling tactile products designed for visually impaired individuals. The platform includes product browsing, category management, a contact system, and an admin dashboard for content management. The application prioritizes accessibility (WCAG compliance), usability, and professional presentation with features like high contrast mode and large text options.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack React Query for server state and caching
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style)
- **Build Tool**: Vite with custom plugins for Replit integration

**Key Design Decisions**:
- Accessibility-first approach with dedicated `AccessibilityProvider` context for high contrast and large text modes
- Component-based architecture using shadcn/ui primitives (Radix UI under the hood)
- Form handling with react-hook-form and zod validation
- Path aliases configured (`@/` for client/src, `@shared/` for shared code)

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Session Management**: express-session with MemoryStore (development) / connect-pg-simple ready
- **Authentication**: Simple session-based auth with bcryptjs password hashing

**API Structure**:
- RESTful endpoints under `/api/` prefix
- CRUD operations for categories, products, partners
- Contact form submissions
- Admin authentication endpoints

### Data Storage
- **Database**: PostgreSQL (required via DATABASE_URL environment variable)
- **Schema Location**: `shared/schema.ts` using Drizzle ORM
- **Migrations**: Generated to `./migrations` directory via `drizzle-kit push`

**Database Tables**:
- `users` - Admin authentication
- `categories` - Product categories with images
- `products` - Individual products linked to categories
- `partners` - Partner/collaboration companies
- `contactSubmissions` - Contact form entries

### Build System
- **Development**: Vite dev server with HMR on port 5000
- **Production**: Custom build script (`script/build.ts`) using esbuild for server bundling and Vite for client
- **Output**: `dist/` directory with `index.cjs` (server) and `public/` (static assets)

### Code Organization
```
client/src/          # React frontend
  components/ui/     # shadcn/ui components
  pages/            # Route components
  hooks/            # Custom React hooks
  lib/              # Utilities, API functions
server/             # Express backend
  routes.ts         # API route definitions
  storage.ts        # Database interface
  seed.ts           # Database seeding
shared/             # Shared types and schemas
  schema.ts         # Drizzle schema + Zod validation
```

## External Dependencies

### Database
- **PostgreSQL**: Required. Connection via `DATABASE_URL` environment variable
- **Drizzle Kit**: Schema management with `npm run db:push`

### UI Components
- **Radix UI**: Full suite of accessible primitives (dialog, dropdown, tabs, etc.)
- **Lucide React**: Icon library
- **shadcn/ui**: Pre-built component system

### Fonts (External CDN)
- Google Fonts: Lexend (headings) and Public Sans (body)

### Session Secret
- `SESSION_SECRET` environment variable recommended for production session security

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal` - Error overlay
- `@replit/vite-plugin-cartographer` - Development tooling
- `@replit/vite-plugin-dev-banner` - Development banner
- Custom `vite-plugin-meta-images` for OpenGraph image handling