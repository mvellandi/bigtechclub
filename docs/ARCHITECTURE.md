# Architecture Specification: TanStack Start + Phoenix/Ash + Better Auth + Zitadel

**Version:** 3.0
**Last Updated:** 2025-12-26
**Status:** Production-Ready Reference Architecture

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Repository Structure](#repository-structure)
- [Authentication Flow](#authentication-flow)
- [Data Flow Patterns](#data-flow-patterns)
- [Type Safety & Code Generation](#type-safety--code-generation)
- [Deployment Architecture](#deployment-architecture)
- [Development Workflow](#development-workflow)
- [Security Considerations](#security-considerations)
- [Performance Optimization](#performance-optimization)
- [Monitoring & Observability](#monitoring--observability)
- [Decision Log](#decision-log)

---

## Overview

This architecture combines the strengths of multiple modern technologies to create a type-safe, scalable, and maintainable full-stack application:

- **Backend:** Phoenix + Ash Framework for resource-driven API development
- **Frontend:** TanStack Start for SSR/SPA React application
- **API Protocol:** JSON:API standard via AshJsonApi
- **Type Safety:** OpenAPI → TypeScript codegen for automatic type generation
- **Authentication:** Better Auth + Zitadel for flexible identity management

### Key Principles

1. **Single Source of Truth:** Ash resources define the domain model, which generates database schemas, REST APIs, OpenAPI specs, and TypeScript types
2. **Standards-Based:** JSON:API for predictable, cacheable REST endpoints
3. **Type Safety End-to-End:** From Elixir structs → OpenAPI schema → TypeScript types → React components
4. **Separation of Concerns:** Backend handles business logic, frontend handles presentation, auth provider handles identity
5. **Security by Default:** OIDC authentication, Ash policies, JWT validation
6. **Developer Experience:** Fast feedback loops, automatic code generation, minimal boilerplate

### Why JSON:API over JSON-RPC?

- **Ash Native:** AshJsonApi is built specifically for Ash Framework
- **RESTful Benefits:** HTTP caching, standard status codes, URL-based resources
- **Rich Relationships:** Built-in support for includes, sparse fieldsets, filtering
- **Standardized:** JSON:API spec provides conventions for pagination, errors, metadata
- **Tooling:** Better browser DevTools support, HTTP caching, CDN compatibility

---

## Technology Stack

### Backend

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Runtime | Elixir | 1.15+ | Functional, concurrent backend runtime |
| Web Framework | Phoenix | 1.8+ | HTTP server, routing, WebSocket support |
| Domain Framework | Ash | 3.11+ | Resource-driven domain modeling |
| API Layer | AshJsonApi | 1.5+ | JSON:API specification implementation |
| Database | PostgreSQL | 14+ | Primary data store (via AshPostgres) |
| OpenAPI Generation | open_api_spex | 3.18+ | OpenAPI 3.0 spec generation |
| HTTP Client | Req | 0.5+ | Modern HTTP client for external APIs |
| JWT Validation | Joken | 2.6+ | JWT parsing and verification |

### Frontend

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Runtime | Node.js | 20 LTS | Server-side JavaScript execution |
| Framework | React | 19+ | UI component library |
| Meta-Framework | TanStack Start | Latest | SSR, routing, server functions |
| Router | TanStack Router | Latest | Type-safe client-side routing |
| State Management | TanStack Query | 5+ | Server state management, caching |
| API Client | openapi-typescript + openapi-fetch | Latest | Type-safe API client from OpenAPI |
| Build Tool | Vite | 6+ | Fast development builds |
| Auth Library | Better Auth | Latest | Authentication library with OIDC support |
| Language | TypeScript | 5.7+ | Static typing for JavaScript |

### Infrastructure

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Auth Provider | Zitadel (self-hosted) | OIDC/OAuth2 identity platform with custom UI |
| Backend Hosting | Fly.io / Railway / VPS | Container deployment for Phoenix |
| Frontend Hosting | Vercel / Cloudflare Pages | Edge deployment for TanStack Start |
| Database Hosting | Fly Postgres / Neon / Self-hosted | Managed or self-hosted PostgreSQL |
| CI/CD | GitHub Actions | Automated testing and deployment |
| Monitoring | Sentry + Phoenix Telemetry | Error tracking and metrics |

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ End User (Browser)                                          │
└────────────┬────────────────────────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────────────────────────┐
│ Zitadel (Self-Hosted Auth Provider)                        │
│  - Custom login UI (Next.js)                                │
│  - Social OAuth (Google, GitHub, etc.)                      │
│  - OIDC/OAuth2 endpoints                                    │
│  - User management & password resets                        │
│  - Token issuance (JWT)                                     │
└────────────┬────────────────────────────────────────────────┘
             │ (OIDC flow via Better Auth)
             ↓
┌─────────────────────────────────────────────────────────────┐
│ TanStack Start (Frontend Server) - Edge Deployed            │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Better Auth (Session Management)                     │  │
│  │  - OIDC integration with Zitadel                     │  │
│  │  - Session storage & token refresh                   │  │
│  │  - Server/client auth state sync                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ SSR (Initial Page Load)                              │  │
│  │  - Server functions call Phoenix JSON:API           │  │
│  │  - Renders React to HTML with data                   │  │
│  │  - Returns full HTML to browser                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ SPA Mode (After Hydration)                           │  │
│  │  - Browser directly calls Phoenix JSON:API          │  │
│  │  - Client-side routing with TanStack Router          │  │
│  │  - State management with TanStack Query              │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────┬────────────────────────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────────────────────────┐
│ Phoenix Backend (API Server)                                │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ HTTP Layer                                           │  │
│  │  - JSON:API routes (/api/companies, /api/products)  │  │
│  │  - OpenAPI spec endpoint (/api/openapi.json)        │  │
│  │  - JWT verification middleware                       │  │
│  │  - CORS configuration                                │  │
│  └──────────────┬───────────────────────────────────────┘  │
│                 │                                            │
│                 ↓                                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ AshJsonApi (JSON:API Layer)                          │  │
│  │  - Automatic CRUD endpoints                          │  │
│  │  - Relationship handling (?include=owner)           │  │
│  │  - Filtering (?filter[status]=published)            │  │
│  │  - Pagination (?page[limit]=20&page[offset]=40)     │  │
│  │  - Sparse fieldsets (?fields[company]=name,ticker)  │  │
│  └──────────────┬───────────────────────────────────────┘  │
│                 │                                            │
│                 ↓                                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Ash Framework                                        │  │
│  │  - Domain resources (Company, User, etc.)           │  │
│  │  - Actions (read, create, update, destroy)          │  │
│  │  - Policies (authorization rules)                   │  │
│  │  - Calculations & Aggregates                        │  │
│  └──────────────┬───────────────────────────────────────┘  │
│                 │                                            │
│                 ↓                                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ OpenAPI Spec Generation                              │  │
│  │  - Reads Ash resources & AshJsonApi config          │  │
│  │  - Generates OpenAPI 3.0 specification               │  │
│  │  - Serves at /api/openapi.json                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└────────────┬────────────────────────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────────────────────────┐
│ PostgreSQL Database                                         │
└─────────────────────────────────────────────────────────────┘
```

### Component Interaction Diagram

```
┌──────────┐    OIDC Flow      ┌──────────────┐
│ Browser  │ ←───────────────→ │ Zitadel Auth │
└─────┬────┘                   └──────────────┘
      │                             │
      │ 1. Login redirect           │ 2. Returns JWT
      │←────────────────────────────┘
      │
      │ 3. Better Auth handles session
      ↓
┌────────────────────┐
│ TanStack Start     │
│ + Better Auth      │
└─────┬──────────────┘
      │ 4. GET /api/companies
      │    Authorization: Bearer <JWT>
      │    Accept: application/vnd.api+json
      ↓
┌────────────────────┐
│ Phoenix Backend    │
│ JWT Verification   │
└─────┬──────────────┘
      │ 5. Verify JWT (OIDC JWKS)
      │ 6. Get/create user from JWT claims
      │ 7. Set Ash actor
      ↓
┌────────────────────┐
│ Ash Resource       │
│ Action + Policies  │
└─────┬──────────────┘
      │ 8. Database query
      ↓
┌────────────────────┐
│ PostgreSQL         │
└────────────────────┘
```

---

## Repository Structure

### Monorepo Layout

```
my-app/
├── backend/                           # Phoenix + Ash backend
│   ├── lib/
│   │   ├── my_app/
│   │   │   ├── application.ex         # OTP application
│   │   │   ├── repo.ex                # Ecto repository
│   │   │   ├── resources/             # Ash resources (domain models)
│   │   │   │   ├── user.ex
│   │   │   │   ├── company.ex
│   │   │   │   └── product.ex
│   │   │   ├── resources.ex           # Ash domain definition
│   │   │   └── json_api.ex            # AshJsonApi domain extension
│   │   └── my_app_web/
│   │       ├── plugs/
│   │       │   └── verify_zitadel_token.ex
│   │       ├── endpoint.ex
│   │       ├── router.ex              # JSON:API routes
│   │       ├── openapi.ex             # OpenAPI spec generation
│   │       └── telemetry.ex
│   ├── priv/
│   │   ├── repo/
│   │   │   ├── migrations/
│   │   │   └── seeds.exs
│   │   └── static/
│   │       └── openapi.json           # Generated OpenAPI spec
│   ├── test/
│   ├── config/
│   │   ├── config.exs                 # AshJsonApi config
│   │   ├── dev.exs
│   │   ├── prod.exs
│   │   └── runtime.exs
│   ├── mix.exs
│   ├── mix.lock
│   └── Dockerfile
│
├── frontend/                          # TanStack Start app
│   ├── app/
│   │   ├── routes/                    # File-based routing
│   │   │   ├── __root.tsx             # Root layout with auth provider
│   │   │   ├── index.tsx              # Landing page (SSR)
│   │   │   ├── login.tsx              # Login page
│   │   │   ├── callback.tsx           # OIDC callback handler
│   │   │   └── app/                   # Authenticated routes
│   │   │       ├── companies.tsx
│   │   │       └── products.tsx
│   │   ├── lib/
│   │   │   ├── api/
│   │   │   │   ├── client.ts          # Generated API client
│   │   │   │   └── schema.d.ts        # Generated TypeScript types
│   │   │   ├── auth.ts                # Zitadel config & helpers
│   │   │   └── utils.ts
│   │   ├── components/
│   │   │   ├── ui/                    # Reusable UI components
│   │   │   └── features/              # Feature-specific components
│   │   ├── ssr.tsx                    # SSR entry point
│   │   └── client.tsx                 # Client hydration entry point
│   ├── public/
│   ├── scripts/
│   │   └── generate-api-client.sh     # Fetch OpenAPI & generate types
│   ├── .env.development
│   ├── .env.production
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── Dockerfile
│
├── .github/
│   └── workflows/
│       ├── backend-ci.yml             # Backend tests & linting
│       ├── backend-deploy.yml         # Deploy to Fly.io
│       ├── frontend-ci.yml            # Frontend tests & type checking
│       └── frontend-deploy.yml        # Deploy to Vercel
│
├── scripts/
│   ├── generate-types.sh              # Generate OpenAPI & TypeScript types
│   └── setup.sh                       # Initial project setup
│
├── docs/
│   ├── ARCHITECTURE.md                # This file
│   ├── API.md                         # API documentation
│   └── DEPLOYMENT.md                  # Deployment guide
│
├── .gitignore
├── README.md
└── docker-compose.yml                 # Local development environment
```

---

## Authentication Flow

### Better Auth + OIDC Integration

#### Authentication Architecture

**Component Responsibilities:**

- **Better Auth (Frontend):** Session management, token refresh, auth state synchronization
- **Zitadel (OIDC Provider):** User identity, password storage, social OAuth, MFA
- **Phoenix Backend:** JWT verification only, no authentication logic

#### Login Flow

```
1. User initiates login → Better Auth redirects to Zitadel
2. User authenticates (email/password, social OAuth, MFA)
3. Zitadel redirects back with authorization code
4. Better Auth exchanges code for JWT tokens
5. Better Auth stores session (httpOnly cookie)
6. Subsequent API calls include JWT in Authorization header
```

#### Backend JWT Verification

Phoenix validates JWTs using OIDC JWKS (JSON Web Key Set):

1. Extract JWT from `Authorization: Bearer <token>` header
2. Fetch JWKS from Zitadel (cached)
3. Verify JWT signature and claims (exp, iss, aud)
4. Extract user identity from JWT claims (sub, email, roles)
5. Create Ash actor from claims
6. Attach actor to request for authorization

#### User Profile Management

**Separation of concerns:**

- Zitadel stores authentication credentials (passwords, OAuth tokens, MFA secrets)
- Phoenix stores user profiles (preferences, application-specific data)
- User ID from JWT (`sub` claim) links the two systems

**Initial user creation:**

1. User authenticates with Zitadel for the first time
2. Backend receives JWT with `sub` claim
3. Backend creates user profile record (if doesn't exist)
4. User profile linked to Zitadel ID

#### Authorization with Ash Policies

Authorization rules defined at the resource level using Ash policies:

- **Public access:** Read-only endpoints for unauthenticated users
- **Authenticated access:** Require valid JWT and actor
- **Ownership rules:** Users can only modify their own resources
- **Role-based access:** Admin/user role checks from JWT claims
- **Relationship-based:** Access determined by resource relationships

**Example policy patterns:**

- Anyone can read published content
- Must be authenticated to create
- Can only update/delete resources you own
- Admins bypass all restrictions

---

## Data Flow Patterns

### Pattern 1: SSR with Initial Data (Public Pages)

**Use Case:** Landing pages, marketing content, SEO-critical pages

**Architecture:**

- TanStack Start server functions fetch data at request time
- Server-to-server API calls (TanStack Start → Phoenix)
- React renders to HTML with pre-fetched data
- Browser receives fully rendered HTML (optimal first paint)
- Client hydrates for interactivity

**Data Flow:**

```
1. User requests / → TanStack Start server
2. Server function calls Phoenix JSON:API (server → server)
3. Phoenix returns JSON:API response
4. TanStack renders React to HTML with data
5. Browser receives full HTML (fast first paint!)
6. Hydration makes page interactive
```

**Benefits:**

- SEO-friendly (search engines see content)
- Fast initial page load
- Works without JavaScript
- No authentication required

### Pattern 2: Client-Side Data Fetching (Authenticated Routes)

**Use Case:** Dashboard, user-specific data, frequent updates

**Architecture:**

- No SSR, routes render without initial data
- Browser makes direct API calls to Phoenix (bypasses TanStack Start)
- TanStack Query manages caching and state
- JWT included in Authorization header
- Optimistic updates and cache invalidation

**Data Flow:**

```
1. User navigates to /app/companies (already hydrated)
2. React component mounts
3. Browser → Phoenix JSON:API (direct, no TanStack server)
4. Phoenix validates JWT, runs Ash query
5. Browser receives JSON:API response
6. React renders
```

**Benefits:**

- Real-time data (no stale SSR data)
- Automatic revalidation
- Optimistic UI updates
- Better for personalized content

### Pattern 3: Hybrid SSR + Client Fetching

**Use Case:** Initial data load with client-side updates

**Architecture:**

- SSR provides initial data snapshot
- Client takes over after hydration
- TanStack Query uses SSR data as initial cache
- Subsequent updates via client-side fetching

**Benefits:**

- Best of both worlds
- Fast initial render + fresh data

### JSON:API Standard Features

JSON:API provides standardized query capabilities:

**Filtering:**

- Field-based filtering: `filter[status]=active`
- Comparison operators: `filter[revenue][gt]=1000000`
- Multiple filters combine with AND logic

**Sparse Fieldsets:**

- Request specific fields only: `fields[company]=name,ticker`
- Reduces payload size
- Per-resource-type field selection

**Relationships & Includes:**

- Include related resources: `include=owner,category`
- Nested includes: `include=owner.organization`
- Included resources returned in `included` array

**Pagination:**

- Offset-based: `page[offset]=20&page[limit]=10`
- Cursor-based: `page[after]=cursor123`
- Response includes `links.next`, `links.prev`

**Sorting:**

- Single field: `sort=name`
- Multiple fields: `sort=-createdAt,name` (- prefix for descending)

**Benefits:**

- Standardized query syntax across all endpoints
- Client-driven data requirements (reduce over-fetching)
- HTTP cacheable at CDN level

---

## Type Safety & Code Generation

### Type Safety Pipeline

```
1. Define Ash Resource (Elixir)
   ↓
2. AshJsonApi generates JSON:API endpoints
   ↓
3. OpenAPI spec generated from Ash resources
   ↓
4. Frontend: openapi-typescript generates TypeScript types
   ↓
5. Frontend: openapi-fetch provides type-safe client
   ↓
6. TypeScript compiler validates API usage
```

### Single Source of Truth

**Backend (Ash Resource):**

- Define domain model once in Ash
- Includes: attributes, relationships, actions, policies, validations
- Constraints defined: required fields, enums, string formats, number ranges

**Automatic Generation:**

- Database schema (migrations)
- JSON:API endpoints (CRUD + custom actions)
- OpenAPI specification (complete API contract)
- TypeScript types (request/response shapes)

**Type Safety Guarantees:**

- ✅ Enum values validated at compile time
- ✅ Required fields enforced
- ✅ Relationship types verified
- ✅ Query parameter types checked
- ✅ Response shapes guaranteed
- ✅ Filter operators type-safe

### Code Generation Workflow

**Backend Setup:**

1. Define Ash resources with AshJsonApi extension
2. Configure OpenAPI spec generation (open_api_spex)
3. Serve OpenAPI spec at `/api/openapi.json` endpoint

**Frontend Setup:**

1. Script to fetch OpenAPI spec from backend
2. Run `openapi-typescript` to generate TypeScript types
3. Create type-safe API client with `openapi-fetch`
4. Run generation before each dev build

**Development Flow:**

1. Modify Ash resource (add field, change type, add enum value)
2. Frontend build process fetches latest OpenAPI spec
3. TypeScript types regenerate automatically
4. TypeScript compiler shows errors where code doesn't match new types
5. Fix frontend code to match updated API contract
6. Commit both backend and frontend changes atomically

**Type Safety Benefits:**

- ✅ Autocomplete for all endpoints, parameters, fields
- ✅ Compile-time errors for invalid query parameters
- ✅ Enum validation (invalid values → compile error)
- ✅ Required field enforcement
- ✅ Relationship type safety
- ✅ Response shape inference
- ✅ JSON:API structure validation
- ✅ Filter operator type checking

---

## Deployment Architecture

### Development Environment

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: my_app_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    command: mix phx.server
    environment:
      DATABASE_URL: postgres://postgres:postgres@postgres:5432/my_app_dev
      SECRET_KEY_BASE: dev_secret_key_base_min_64_chars
      ZITADEL_JWKS_URI: https://your-instance.zitadel.cloud/oauth/v2/keys
    ports:
      - "4000:4000"
    depends_on:
      - postgres
    volumes:
      - ./backend:/app
      - backend_build:/app/_build
      - backend_deps:/app/deps

  frontend:
    build: ./frontend
    command: pnpm dev
    environment:
      VITE_API_URL: http://localhost:4000
      ZITADEL_AUTHORITY: https://your-instance.zitadel.cloud
      ZITADEL_CLIENT_ID: your_client_id
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - frontend_node_modules:/app/node_modules

volumes:
  postgres_data:
  backend_build:
  backend_deps:
  frontend_node_modules:
```

### Production Deployment

#### Backend (Fly.io)

```dockerfile
# backend/Dockerfile
FROM hexpm/elixir:1.15.7-erlang-26.1.2-alpine-3.18.4 AS builder

WORKDIR /app

RUN apk add --no-cache build-base git
RUN mix local.hex --force && mix local.rebar --force

ENV MIX_ENV=prod

COPY mix.exs mix.lock ./
RUN mix deps.get --only $MIX_ENV
RUN mix deps.compile

COPY lib lib
COPY priv priv
COPY config config

RUN mix compile
RUN mix release

FROM alpine:3.18.4
RUN apk add --no-cache libstdc++ openssl ncurses-libs

WORKDIR /app
COPY --from=builder /app/_build/prod/rel/my_app ./

ENV HOME=/app
ENV MIX_ENV=prod

CMD ["bin/my_app", "start"]
```

```toml
# backend/fly.toml
app = "my-app-backend"
primary_region = "sjc"

[build]
  dockerfile = "Dockerfile"

[env]
  PHX_HOST = "api.myapp.com"
  PORT = "8080"

[[services]]
  protocol = "tcp"
  internal_port = 8080

  [[services.ports]]
    port = 80
    handlers = ["http"]
    force_https = true

  [[services.ports]]
    port = 443
    handlers = ["tls", "http"]

[deploy]
  release_command = "bin/my_app eval MyApp.Release.migrate"
```

#### Frontend (Vercel)

```json
// frontend/vercel.json
{
  "buildCommand": "pnpm generate:api && pnpm build",
  "installCommand": "pnpm install",
  "framework": null,
  "outputDirectory": ".output/public",
  "env": {
    "VITE_API_URL": "https://api.myapp.com",
    "ZITADEL_AUTHORITY": "https://your-instance.zitadel.cloud",
    "ZITADEL_CLIENT_ID": "production_client_id"
  }
}
```

---

## Development Workflow

### Initial Setup

```bash
# 1. Clone repository
git clone https://github.com/yourorg/my-app.git
cd my-app

# 2. Setup backend
cd backend
mix deps.get
mix ecto.setup
cd ..

# 3. Setup frontend
cd frontend
pnpm install
cd ..

# 4. Start development environment
docker-compose up
```

### Daily Development Loop

```bash
# Terminal 1: Backend
cd backend
mix phx.server

# Terminal 2: Frontend (auto-generates types on start)
cd frontend
pnpm dev

# Terminal 3: Regenerate types when backend changes
cd frontend
pnpm generate:api
```

### Type Generation Workflow

1. Modify Ash resource (add field, change action, etc.)
2. Save file
3. Run `pnpm generate:api` in frontend
4. OpenAPI spec fetched from backend
5. TypeScript types regenerated
6. TypeScript compiler shows errors in frontend
7. Fix frontend code to match new types
8. Commit both backend + frontend changes together

---

## Security Considerations

### 1. Authentication & Authorization

**JWT Validation:**
- Verify signature using Zitadel JWKS
- Check `exp`, `iss`, `aud`
- Cache JWKS with TTL

**Ash Policies:**
- Define at resource level
- Use `actor` from JWT claims
- Deny by default

### 2. CORS Configuration

```elixir
# backend/lib/my_app_web/endpoint.ex
plug Corsica,
  origins: [
    ~r{^https://.*\.myapp\.com$},
    ~r{^https://.*\.vercel\.app$},
    "http://localhost:3000"
  ],
  allow_headers: ["content-type", "authorization", "accept"],
  allow_methods: ["GET", "POST", "PATCH", "DELETE"],
  allow_credentials: true
```

### 3. Rate Limiting

```elixir
plug PlugAttack.RateLimit,
  storage: {PlugAttack.Storage.Ets, MyApp.PlugAttack.Storage},
  rules: [
    {:by_ip, 60_000, 100},
    {:by_user, 60_000, 200}
  ]
```

---

## Performance Optimization

### Backend

**Database Indexes:**
```elixir
postgres do
  custom_indexes do
    index [:ticker], unique: true
    index [:industry]
    index [:owner_id]
  end
end
```

**Caching:**
```elixir
# Cache JWKS
Cachex.fetch!(:jwks_cache, :zitadel_jwks, fn ->
  {:commit, fetch_from_zitadel(), ttl: :timer.hours(1)}
end)
```

### Frontend

**TanStack Query:**
```typescript
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      gcTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
})
```

**HTTP Caching:**
JSON:API responses can be cached by CDN based on standard HTTP cache headers.

---

## Monitoring & Observability

### Backend

```elixir
# Phoenix Telemetry
summary("phoenix.endpoint.stop.duration", tags: [:route])
summary("my_app.repo.query.total_time", tags: [:source])

# Sentry
config :sentry,
  dsn: System.get_env("SENTRY_DSN"),
  environment_name: :prod
```

### Frontend

```typescript
// Sentry
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
})
```

---

## Decision Log

### Why AshJsonApi over ash_typescript?

**Chosen:** AshJsonApi (JSON:API)
**Alternative:** ash_typescript (JSON-RPC)

**Reasoning:**
- **Ash Native:** AshJsonApi is built specifically for Ash, automatic route generation
- **RESTful:** HTTP caching, standard status codes, URL-based resources
- **Standardized:** JSON:API spec provides consistent conventions
- **Rich Features:** Includes, sparse fieldsets, filtering, pagination built-in
- **No Performance Loss:** Still JSON over HTTP, same as JSON-RPC
- **Better Tooling:** OpenAPI generation, browser DevTools, CDN compatibility

### Why OpenAPI + openapi-typescript over Manual Types?

**Chosen:** OpenAPI generation → openapi-typescript
**Alternative:** Manual TypeScript definitions

**Reasoning:**
- **Single Source of Truth:** Ash resources → OpenAPI → TypeScript
- **Automatic Updates:** Types regenerate when backend changes
- **Industry Standard:** OpenAPI is widely supported
- **Better DX:** Full autocomplete and type checking
- **Validation:** Catch API mismatches at compile time

### Why TanStack Start over Next.js?

**Chosen:** TanStack Start
**Alternative:** Next.js

**Reasoning:**
- Better TypeScript support with TanStack Router
- More flexible SSR (opt-out per route)
- Framework-agnostic
- Better TanStack Query integration

### Why Separate Deployments?

**Chosen:** Vercel (frontend) + Fly.io (backend)
**Alternative:** Phoenix monolith

**Reasoning:**
- Frontend on CDN (global performance)
- Independent scaling
- Faster frontend deploys
- Can use preview deployments

---

## Appendix

### Useful Commands

```bash
# Backend
mix phx.server                    # Start server
mix test                          # Run tests
mix ecto.migrate                  # Run migrations

# Frontend
pnpm generate:api                 # Generate types from OpenAPI
pnpm typecheck                    # Type checking
pnpm dev                          # Dev server
pnpm build                        # Production build

# Docker
docker-compose up                 # Start all services

# Deployment
fly deploy                        # Deploy backend
vercel deploy --prod              # Deploy frontend
```

### References

- [Ash Framework](https://hexdocs.pm/ash/readme.html)
- [AshJsonApi](https://hexdocs.pm/ash_json_api/readme.html)
- [JSON:API Specification](https://jsonapi.org/)
- [TanStack Start](https://tanstack.com/start/latest)
- [TanStack Query](https://tanstack.com/query/latest)
- [openapi-typescript](https://openapi-ts.pages.dev/)
- [Zitadel](https://zitadel.com/docs)

---

**Document Version:** 2.0 - Updated to use AshJsonApi + OpenAPI instead of ash_typescript + JSON-RPC
