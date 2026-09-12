# DroneTV AI Support & Lead Assistant

A full-stack web application built for the IPAGE Group Full Stack Developer Intern technical assignment. It provides a responsive marketing site for DroneTV's drone services and training programmes, a rule-based AI-style support chatbot, an enquiry/lead capture system, and a secured admin dashboard for managing incoming leads.

> This is an original implementation designed for evaluation purposes and is **not affiliated with or copied from dronetv.in**.

## Project Description

Visitors can browse DroneTV's services and courses, submit enquiries via a contact form, or chat with an assistant that answers predefined questions and can capture a lead directly within the conversation. All enquiries — whether from the contact form or the chatbot — are stored in MongoDB and surfaced in a protected admin dashboard where staff can search, filter, review, update status, add notes, and delete records.

## Features

- Fully responsive frontend (desktop / tablet / mobile): Home, Services, Courses, Chatbot, Contact, Admin Login, Admin Dashboard
- Intent-based rule engine chatbot with fuzzy/typo-tolerant matching, session conversation history, quick replies, fallback handling, and a reset option
- In-chat lead capture that submits an enquiry with the full conversation transcript attached
- Shared, validated enquiry form (name, email, phone, user type, interest, message) used across the site
- Full CRUD REST API for enquiries with server-side search, filtering, sorting, and pagination
- MongoDB persistence via Mongoose with schema-level validation and indexes
- JWT (HTTP-only cookie) admin authentication protecting all dashboard-facing endpoints
- Centralized error handling — no internal error details are ever exposed to the client
- Security hardening: Helmet, CORS allow-listing, rate limiting, NoSQL-injection sanitization, bcrypt password hashing, environment-variable-only secrets
- Dashboard analytics (totals, new leads, high-priority leads, weekly count, top interests) via an aggregation endpoint

## Technologies Used

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, React Router, TanStack Query, React Hook Form, Zod, Axios |
| Backend | Node.js, Express, TypeScript, Mongoose |
| Database | MongoDB (Atlas or local) |
| Auth | JWT + bcrypt, HTTP-only cookie |
| Security middleware | Helmet, CORS, express-rate-limit, express-mongo-sanitize |

## Project Structure

```
dronetv/
  backend/     # Node.js + Express + TypeScript REST API (see backend/README.md)
  frontend/    # React + TypeScript + Vite SPA (see frontend/README.md)
```

Each folder has its own detailed README with setup instructions, environment variables, and (for the backend) full API documentation.

## Quick Start

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env      # fill in MONGODB_URI, JWT_SECRET, etc.
npm run seed:admin        # creates the one admin login
npm run dev                # http://localhost:5000
```

### 2. Frontend
```bash
cd frontend
npm install
cp .env.example .env      # set VITE_API_BASE_URL to the backend URL
npm run dev                # http://localhost:5173
```

Open `http://localhost:5173` in your browser. Use the admin credentials from `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` (set in `backend/.env`) to sign in at `/admin/login`.

## Environment Variables

See `backend/.env.example` and `frontend/.env.example` for the full list. At minimum you need:
- `MONGODB_URI` — a MongoDB Atlas or local connection string
- `JWT_SECRET` — any long random string
- `VITE_API_BASE_URL` — the backend's `/api` base URL

## Database Setup

The app uses MongoDB with two collections (`enquiries`, `admins`), both defined via Mongoose schemas in `backend/src/models/`. No manual migration is needed — collections, validation rules, and indexes are created automatically on first connection/write. See `backend/README.md` for Atlas setup steps.

## API Endpoints

Full documentation with request/response examples is in `backend/README.md`. Summary:

| Method | Endpoint | Auth |
|---|---|---|
| GET | `/api/enquiries` | Admin |
| GET | `/api/enquiries/:id` | Admin |
| POST | `/api/enquiries` | Public |
| PUT / PATCH | `/api/enquiries/:id` | Admin |
| DELETE | `/api/enquiries/:id` | Admin |
| POST | `/api/auth/login` | Public |
| POST | `/api/auth/logout` | Public |
| GET | `/api/auth/me` | Admin |
| GET | `/api/dashboard/stats` | Admin |

## Architecture

```
Browser → React SPA → Axios → Express API → Middleware (helmet, cors, rate-limit, mongo-sanitize)
        → Route → Zod Validator → Controller → Service → Mongoose Model → MongoDB
```

The chatbot's intent matching runs entirely client-side behind a single `resolveIntent()` function
(`frontend/src/services/chatbotEngine.ts`), so it can be swapped for a real LLM call later without
touching any UI or state-management code.

## Screenshots & Video Walkthrough

