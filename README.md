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
http://localhost:8080/swagger-ui/index.html  (interactive Swagger UI)
http://localhost:8080/v3/api-docs            (OpenAPI JSON)
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

Logs
  - By default the backend uses Logback. A `logback-spring.xml` is included and writes to `logs/app.log` and console.
  - Set `LOG_PATH` environment variable to change the logs folder, e.g.: `SET LOG_PATH=./logs` (PowerShell).
  - Tail logs during development with `Get-Content .\\logs\\app.log -Wait` (PowerShell).

## Project Structure (high level)

- `ecom-backend/` — Java backend source, `pom.xml`, `src/main/java/com/ecommerce` and resources.
- `ecom-frontend/` — React app in `src/`, components organized by feature (auth, cart, checkout, admin, etc.).

## Contributing

- Feel free to open issues and submit pull requests. For major changes, open an issue first to discuss the change.


## Contact

- For questions about the codebase, review `ecom-backend/HELP.md` and the frontend `README.md` (if present) for local notes.

## AI Integration (Gemini)

This project includes a first-pass integration of generative AI features (product summarization) using Google Generative Language (Gemini) through a Spring-backed API. The feature is implemented for developer/testing purposes and includes UI affordances to surface AI-generated summaries inline on product cards and inside the product detail modal.

What was added
- Backend: a small AI service and controller that call the Generative Language API using Spring WebClient. Key files:
  - `ecom-backend/pom.xml` — added `spring-boot-starter-webflux` for `WebClient` support.
  - `ecom-backend/src/main/java/com/ecommerce/ai/AiService.java` — calls the model endpoint, handles API key fallback and errors.
  - `ecom-backend/src/main/java/com/ecommerce/ai/AiController.java` — POST `/api/ai/summarize` endpoint used by the frontend.
  - `ecom-backend/src/main/java/com/ecommerce/project/SbComApplication.java` — adjusted component scanning and a development CORS config to allow `http://localhost:5173`.

- Frontend: wiring and UI for requesting and displaying summaries.
  - `ecom-frontend/src/api/api.js` — added `summarizeProduct(product)` helper that POSTs to the backend summarize endpoint.
  - `ecom-frontend/src/components/shared/ProductCard.jsx` — inline “Summarize” button and a prominent AI-styled summary card (badge, soft gradient, centered text, transient highlight).
  - `ecom-frontend/src/components/shared/ProductViewModal.jsx` — modal-level Summarize action and matching AI-styled summary display.

How it behaves
- Click the `Summarize` button on a product card or in the product modal to request a short AI summary for that product.
- The UI shows an `AI` badge, a rounded card with a soft sky gradient, and a short ring/shadow highlight when a new summary appears to emphasize that the content was AI-generated.
- The backend returns friendly error messages (e.g., model or auth problems) if the configured model name or API key is invalid.

Run & configuration (dev)
1. Provide the AI key for Generative Language in the environment. The backend reads `ai.api.key` (or `AI_API_KEY`) and will fall back to `GOOGLE_API_KEY` if present. Set an env var before starting the app. Example (PowerShell):

```powershell
SET AI_API_KEY=your_google_api_key_here
```

2. Start the backend (from `ecom-backend`):

```powershell
./mvnw spring-boot:run
```

3. Start the frontend (from `ecom-frontend`):

```bash
npm install
npm run dev
```

Notes & security
- The current implementation is for development and demonstration. Before using in production you should:
  - Store API keys and secrets in a secure secret manager (not checked into `application.properties`).
  - Add authentication and rate-limiting to the AI endpoint to prevent abuse and billing surprises.
  - Prefer OAuth/service-account flows or Google Cloud IAM bindings where appropriate for production access to Google services.
  - Validate and sanitize model responses when displaying them in the UI (consider safety filters, length limits, and user controls for regenerating or dismissing results).

Next steps (suggestions)
- Add server-side caching for summaries and a model discovery endpoint so the UI can show available models.
- Add a small per-user or per-session cache to reduce repeated API calls for the same product.
- Add logging/metrics and a usage dashboard to monitor costs and request success/failure rates.

