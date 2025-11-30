# Dubai Logistics Magazine - Replit Project Guide

## Overview

This is a **Dubai Logistics Magazine** web application - a content-rich publication platform featuring industry articles, a comprehensive company directory, and user engagement tools. The application serves as Dubai's premier logistics industry publication, providing news, insights, and a searchable database of logistics companies.

The project is built as a full-stack web application with a React frontend and Express backend, designed to showcase logistics industry content, facilitate company discovery, and enable user inquiries through contact forms.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**UI Component System**: shadcn/ui component library (New York style variant) built on Radix UI primitives
- Comprehensive set of accessible, customizable components
- Tailwind CSS for styling with custom design tokens
- Component aliases configured for clean imports (`@/components`, `@/lib`, etc.)

**Routing**: Wouter for lightweight client-side routing
- Page structure includes: Home, Articles (with categories), Company Directory (with categories), About, Contact, Subscribe, Search
- Dynamic routes for article details and company details
- 404 not-found page handling

**State Management**: TanStack Query (React Query) for server state
- Centralized query client configuration
- Custom API request utilities with error handling
- Configured to prevent unnecessary refetching

**Design System**: Custom Dubai Logistics theme
- Primary color: Dubai red (#C8102E / HSL 355 85% 43%)
- Secondary color: Navy blue (#1B365D / HSL 217 56% 23%)
- Accent color: Gold (#FFD700 / HSL 51 100% 50%)
- Typography hierarchy using Montserrat, Open Sans, and Roboto fonts
- Spacing system based on Tailwind's 4/8/12/20 unit scale
- Custom CSS variables for theming and elevation effects

**Data Management**: Static content data stored in `client/src/lib/magazine-data.ts`
- Articles with categories, tags, featured status
- Company directory with services, locations, categories
- Search functionality across articles and companies
- Currently using in-memory data structures (prepared for backend integration)

### Backend Architecture

**Framework**: Express.js with TypeScript running on Node.js

**API Design**: RESTful API endpoints
- `POST /api/inquiries` - Submit contact/inquiry forms
- `GET /api/inquiries` - Retrieve all inquiries (admin)
- `GET /api/inquiries/:id` - Get single inquiry by ID

**Data Validation**: Zod schemas for runtime type checking and validation
- Schema definitions in `shared/schema.ts`
- Validation on inquiry submissions
- Type-safe data flow between client and server

**Storage Layer**: Abstracted storage interface (`IStorage`) with in-memory implementation
- Currently uses `MemStorage` class with Map-based storage
- Ready for database integration (Drizzle ORM configured)
- Separate storage for users and inquiries

**Build Process**: Custom esbuild configuration
- Bundles server code with allowlisted dependencies for faster cold starts
- Separate Vite build for client assets
- Production-ready bundling with external dependency management

**Development Environment**: 
- Vite dev server with HMR (Hot Module Replacement)
- Middleware mode integration with Express
- Development-only Replit plugins for enhanced debugging

### Database Design (Configured, Not Yet Active)

**ORM**: Drizzle ORM configured for PostgreSQL via Neon Database serverless driver

**Schema Structure** (`shared/schema.ts`):
- **users table**: Authentication/user management (id, username, password)
- **inquiries table**: Contact form submissions (id, name, email, phone, company, serviceType, message, createdAt)
- UUID primary keys with auto-generation
- Timestamp tracking for inquiries

**Migration Strategy**: Drizzle Kit configured with migrations output to `./migrations` directory
- Push-based schema deployment via `npm run db:push`
- Shared schema location for type consistency across frontend/backend

### Authentication & Authorization

**Current State**: Basic user schema defined but authentication not yet implemented
- User table structure prepared for future auth implementation
- Password field present (ready for hashing integration)
- No active session management or authentication middleware

**Prepared Infrastructure**:
- Session storage dependencies installed (connect-pg-simple, express-session)
- Passport.js dependencies available for future OAuth/local strategy implementation

### Build & Deployment

**Development**: 
- `npm run dev` - Runs Express server with Vite middleware and HMR
- TypeScript compilation on-the-fly via tsx

**Production Build**:
- `npm run build` - Executes custom build script
- Client: Vite builds React app to `dist/public`
- Server: esbuild bundles server code to `dist/index.cjs`
- Dependency optimization: Allowlist of critical packages bundled, others externalized

**Type Checking**: `npm run check` - TypeScript compiler validation without emit

**Path Aliases**: Configured across tsconfig, Vite, and component library
- `@/` → `client/src/`
- `@shared/` → `shared/`
- `@assets/` → `attached_assets/`

### Static Asset Serving

**Production**: Express serves built files from `dist/public`
- SPA fallback to index.html for client-side routing
- Static file middleware for assets

**Development**: Vite dev server handles all asset requests
- Index.html template reloading with cache-busting query parameters
- Source map support for debugging

## External Dependencies

### UI & Styling
- **Radix UI**: Complete set of accessible component primitives (@radix-ui/react-*)
- **Tailwind CSS**: Utility-first CSS framework with PostCSS
- **class-variance-authority**: Component variant management
- **cmdk**: Command palette component
- **embla-carousel-react**: Carousel/slider functionality
- **lucide-react**: Icon library

### Data & Forms
- **React Hook Form**: Form state management (@hookform/resolvers for validation)
- **Zod**: Schema validation and type inference
- **drizzle-zod**: Zod schema generation from Drizzle ORM schemas
- **date-fns**: Date manipulation and formatting

### State Management
- **TanStack Query**: Server state synchronization and caching

### Routing
- **Wouter**: Lightweight client-side routing (no external dependencies)

### Database (Configured)
- **Drizzle ORM**: Type-safe SQL query builder
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon
- **drizzle-kit**: Schema migration and management tool

### Backend Framework
- **Express.js**: Web server framework
- **cors**: Cross-origin resource sharing (if enabled)
- **express-rate-limit**: API rate limiting (if enabled)

### Build Tools
- **Vite**: Frontend build tool and dev server
- **esbuild**: Fast JavaScript bundler for server code
- **tsx**: TypeScript execution for Node.js
- **TypeScript**: Static type checking

### Development Tools (Replit-specific)
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development environment indicators

### Session & Auth (Installed, Not Active)
- **express-session**: Session middleware
- **connect-pg-simple**: PostgreSQL session store
- **passport**: Authentication middleware (not configured)
- **passport-local**: Local authentication strategy (not configured)

### Potential Future Integrations
- **nodemailer**: Email sending (installed but unused)
- **stripe**: Payment processing (installed but unused)
- **openai**, **@google/generative-ai**: AI integrations (installed but unused)
- **multer**: File upload handling (installed but unused)
- **jsonwebtoken**: JWT token management (installed but unused)