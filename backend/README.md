# DroneTV — Backend API

Node.js + Express + TypeScript REST API powering the DroneTV AI Support & Lead Assistant. Persists enquiries in MongoDB via Mongoose, protects admin operations with JWT (HTTP-only cookie) auth, and centralizes validation/error handling.

## Tech Stack

- Node.js + Express + TypeScript
- MongoDB + Mongoose (MongoDB Atlas recommended)
- Zod for request validation
- JWT (`jsonwebtoken`) + `bcryptjs` for admin authentication
- Security: `helmet`, `cors`, `express-rate-limit`, `express-mongo-sanitize`

## Project Structure

```
backend/
  src/
    routes/            # enquiry, auth, dashboard route definitions
    controllers/        # thin request/response orchestration
    services/            # business logic (CRUD, lead scoring, stats)
    models/               # Mongoose schemas (Enquiry, Admin)
    middleware/            # auth, validation, rate limiting, error handling
    validators/              # Zod schemas
    config/                   # env loader, DB connection
    utils/                     # ApiError, asyncHandler, apiResponse, seed script
    types/                      # Express Request augmentation
    app.ts                       # Express app + middleware registration
    server.ts                     # entry point
  .env.example
```

## Setup Instructions

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Configure environment variables
Copy `.env.example` to `.env` and fill in real values:
```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `PORT` | Port the API listens on (default `5000`) |
| `NODE_ENV` | `development` or `production` |
| `MONGODB_URI` | MongoDB Atlas (or local) connection string |
| `JWT_SECRET` | Long random string used to sign admin session tokens |
| `JWT_EXPIRES_IN` | Token lifetime, e.g. `2h` |
| `CLIENT_ORIGIN` | Frontend origin allowed by CORS, e.g. `http://localhost:5173` |
| `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` / `SEED_ADMIN_NAME` | Used only by the admin seed script |

### 3. Database setup

**MongoDB Atlas (recommended):**
1. Create a free cluster at https://www.mongodb.com/atlas
2. Create a database user and allow network access from your IP (or `0.0.0.0/0` for development)
3. Copy the connection string into `MONGODB_URI` in `.env`

**Local MongoDB:** install MongoDB Community Server and use `mongodb://localhost:27017/dronetv`.

No manual schema setup is required — Mongoose creates collections and indexes automatically on first write.

### 4. Seed an admin account
There is no public registration endpoint by design. Create the one admin user:
```bash
npm run seed:admin
```
This creates/updates an admin using `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` from `.env`.

### 5. Run the server
```bash
npm run dev      # development, with auto-reload
npm run build    # compiles TypeScript to dist/
npm start        # runs the compiled dist/server.js
```

The API will log a successful MongoDB connection and start listening on `PORT`.

## API Endpoints

All responses use a consistent envelope:
```json
{ "success": true, "message": "...", "data": ... }
{ "success": false, "message": "...", "errors": [ { "field": "...", "message": "..." } ] }
```

### Enquiries
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/enquiries` | Admin | List enquiries. Query params: `status`, `userType`, `search`, `page`, `limit`, `sort` |
| GET | `/api/enquiries/:id` | Admin | Get a single enquiry |
| POST | `/api/enquiries` | Public | Create an enquiry (contact form or chatbot) |
| PUT / PATCH | `/api/enquiries/:id` | Admin | Update status, priority, adminNotes, or other fields |
| DELETE | `/api/enquiries/:id` | Admin | Delete an enquiry |

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Verify credentials, set HTTP-only JWT cookie |
| POST | `/api/auth/logout` | Clear the session cookie |
| GET | `/api/auth/me` | Return the currently authenticated admin |

### Dashboard
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/dashboard/stats` | Totals, new/high-priority counts, status funnel, top interests |

### Health check
`GET /api/health` — returns `200` with uptime, no auth required.

## Security Notes

- Admin routes require a valid JWT in an `httpOnly`, `sameSite=strict` cookie (`secure` in production)
- All enquiry input is validated server-side with Zod regardless of frontend validation
- `express-mongo-sanitize` strips `$`/`.` operators from request input to block NoSQL injection
- Passwords are hashed with bcrypt; the hash is never returned by any query (`select: false`)
- Rate limiting is applied to `/api/auth/login` and `POST /api/enquiries`
- Errors are centralized in `errorHandler.middleware.ts` — the client only ever sees a safe message, never a raw stack trace or DB error

## Error Handling Reference

| Scenario | Response |
|---|---|
| Invalid `:id` | `400` — "Invalid enquiry ID" |
| Enquiry not found | `404` — "Enquiry not found" |
| Validation failure | `400` — field-level errors array |
| No/invalid auth cookie on protected route | `401` |
| Unhandled server/DB error | `500` — generic safe message only |
