# E-Commerce (Ecom) Project

## About

This repository contains a production-like e-commerce reference application built to demonstrate a real-world online retail platform. It is designed and implemented to address common business needs for selling products online: catalog management, secure authentication, cart and checkout flows, payment processing, order tracking, basic seller/admin operations, and performance-sensitive data access.

How it's built:

- A modular backend using Java 17 and Spring Boot (REST APIs, security, data, and caching) so server-side concerns (auth, payments, persistence) are separated from UI concerns.
- A modern single-page frontend using React + Vite with Redux for state management and MUI for consistent UI, enabling a responsive, fast user experience.
- Integrations such as MySQL (persistent storage), Redis (caching), and Stripe (payments) solve durability, latency, and payment acceptance respectively.

How it solves real-world problems:

- Provides a secure authentication and authorization model (JWT + Spring Security) to protect user data and restrict admin/seller actions.
- Implements reliable checkout with Stripe to accept payments without storing card data, helping with PCI scope reduction.
- Uses Redis caching to reduce DB load and improve response times for high-read endpoints (product listing, search), improving scalability.
- Offers admin tooling for product, order, and category management to support operational workflows required by merchants.
- Uses Spring Data JPA for clear domain modeling and easier evolution of the schema; easily extensible to support promotions, inventory rules, and more.

## Overview

This repository contains a full-stack e-commerce application split into two folders:

- `ecom-backend`: Java Spring Boot backend providing REST APIs, authentication, payment integration, caching, and data persistence.
- `ecom-frontend`: React + Vite frontend providing the user interface for customers, sellers and admins.

The project implements a typical e-commerce flow: product browsing, cart, checkout, orders, user profiles, and admin management.

## Features

- User authentication (JWT-based) and role-based access control
- Product catalog with search and filters
- Shopping cart and quantity management
- Checkout and payment integrations (Stripe)
- Order management and user profile pages
- Admin dashboard for products, orders, categories, and sellers
- Redis caching for performance
- OpenAPI (Swagger) docs for backend APIs

## Architecture

- Frontend: Single Page Application (React) built with Vite. Uses Redux for state management and MUI for UI components.
- Backend: Spring Boot (Java 17) REST API with Spring Data JPA (MySQL), Spring Security (JWT), Redis, and Stripe integration.
- Persistence: MySQL database (runtime connector configured) and Redis for caching and session-like fast lookups.

## Tech Stack

- Backend
  - **Language:** Java 17
  - **Framework:** Spring Boot 3.5.x
  - **Data:** Spring Data JPA, MySQL
  - **Security:** Spring Security (JWT)
  - **Cache:** Spring Data Redis
  - **Payments:** Stripe Java SDK
  - **API Docs:** springdoc-openapi UI (Swagger)
  - **Build:** Maven (wrapper included)

- Frontend
  - **Library:** React 18
  - **Bundler/Dev:** Vite
  - **State:** Redux Toolkit / react-redux
  - **UI:** MUI (@mui/material), Swiper for sliders
  - **Forms:** react-hook-form
  - **HTTP:** axios
  - **Payment:** @stripe/react-stripe-js and @stripe/stripe-js

## Important Files

- Backend: [ecom-backend/pom.xml](ecom-backend/pom.xml#L1) and [ecom-backend/src/main/resources/application.properties](ecom-backend/src/main/resources/application.properties#L1)
- Frontend: [ecom-frontend/package.json](ecom-frontend/package.json#L1)

## Prerequisites

- Java 17 (for backend)
- Maven (optional — project includes `mvnw` wrapper)
- Node.js (v16/18+) and npm or pnpm (for frontend)
- MySQL server (or update datasource to use another DB)
- Redis instance (optional but recommended for caching)

## Backend — Setup & Run

1. Open a terminal in `ecom-backend`.
2. Configure the database and secrets in environment variables or directly in `application.properties` (see keys below).
3. Build and run with Maven wrapper:

```powershell
./mvnw spring-boot:run
```

Or build the jar and run:

```powershell
./mvnw clean package
java -jar target/sb-com-0.0.1-SNAPSHOT.jar
```

Backend defaults defined in `application.properties`:

- `spring.datasource.url=jdbc:mysql://localhost:3306/myecom`
- `spring.datasource.username` and `spring.datasource.password`
- `spring.jpa.hibernate.ddl-auto=update` (adjust for production)
- `project.image=images/` (image folder)
- `spring.app.jwtSecret` and `spring.app.jwtExpirationMs` (JWT settings)
- `stripe.secret.key` (expects `STRIPE_SECRET_KEY` env var)
- `frontend.url` (frontend origin)
- `spring.data.redis.*` (Redis connection settings)

Environment variables recommended (examples):

```powershell
SET SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/myecom
SET SPRING_DATASOURCE_USERNAME=root
SET SPRING_DATASOURCE_PASSWORD=root@123
SET STRIPE_SECRET_KEY=sk_test_...
```

API docs (Swagger UI) are available when the backend is running at:

```
http://localhost:8080/swagger-ui.html
```

## Frontend — Setup & Run

1. Open a terminal in `ecom-frontend`.
2. Install dependencies:

```bash
npm install
```

3. Start dev server:

```bash
npm run dev
```

This runs Vite dev server by default at `http://localhost:5173` (see terminal output).

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Environment & Configuration

- Backend configuration primarily resides in `ecom-backend/src/main/resources/application.properties`.
- Sensitive values (DB credentials, Stripe keys, JWT secret) should be supplied via environment variables in production.

Key environment variables used by the project (examples):

- `SPRING_DATASOURCE_URL` — JDBC URL for MySQL
- `SPRING_DATASOURCE_USERNAME` — DB username
- `SPRING_DATASOURCE_PASSWORD` — DB password
- `STRIPE_SECRET_KEY` — Stripe secret key

## Database & Migrations

- The project uses Spring Data JPA. By default `spring.jpa.hibernate.ddl-auto=update` will update schema automatically for development.
- For production, use a proper migration tool (Flyway or Liquibase) and set `ddl-auto` to `validate` or `none`.

## Caching (Redis)

- Redis is configured by `spring.data.redis.host`, `spring.data.redis.port`, and `spring.data.redis.password` in `application.properties`.
- If Redis is not available, caching features may be disabled or fall back to defaults.

## Payments

- Stripe is integrated via `com.stripe:stripe-java`. Provide `STRIPE_SECRET_KEY` to enable payments.

## Tests

- Backend unit/integration tests use Maven test lifecycle. Run:

```powershell
./mvnw test
```

- Frontend tests are not included by default; add testing tools (Jest/Testing Library) if needed.



## Troubleshooting

- If the frontend dev server shows `use --host to expose`, run `npm run dev -- --host` to access from network.
- Check `application.properties` and environment variables if DB connections fail.

## Project Structure (high level)

- `ecom-backend/` — Java backend source, `pom.xml`, `src/main/java/com/ecommerce` and resources.
- `ecom-frontend/` — React app in `src/`, components organized by feature (auth, cart, checkout, admin, etc.).

## Contributing

- Feel free to open issues and submit pull requests. For major changes, open an issue first to discuss the change.

## License

- Add a LICENSE file at project root if you want to specify licensing terms. Currently none is declared in this repo.

## Contact

- For questions about the codebase, review `ecom-backend/HELP.md` and the frontend `README.md` (if present) for local notes.
