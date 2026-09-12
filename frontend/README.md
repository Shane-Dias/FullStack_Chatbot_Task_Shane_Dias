# DroneTV — Frontend

React 18 + TypeScript + Vite + Tailwind CSS single-page application for the DroneTV AI Support & Lead Assistant.

## Tech Stack

- React 18 + TypeScript, built with Vite
- Tailwind CSS (custom dark, tech-forward theme)
- React Router v6
- TanStack Query for server state (enquiries, dashboard stats)
- React Hook Form + Zod for validated forms
- Axios API client with normalized error handling
- lucide-react icons, react-hot-toast for notifications

## Project Structure

```
frontend/
  src/
    components/
      common/        # Button, FormFields, Modal, Spinner, EmptyState, ServiceIcon
      chatbot/        # ChatWidget, ChatWindow, MessageBubble, QuickReplies, ChatInput
      enquiry/        # EnquiryForm (shared by Contact page + service/course modals)
      dashboard/       # EnquiryTable, EnquiryDetailsDrawer, FiltersBar, StatsCards, StatusBadge
    pages/              # HomePage, ServicesPage, CoursesPage, ChatbotPage, ContactPage,
                          AdminLoginPage, AdminDashboardPage
    layouts/              # MainLayout (public), AdminLayout (protected)
    hooks/                  # useChatbot, useEnquiries, useAuth
    services/                # apiClient, enquiryService, authService, chatbotEngine
    types/                    # enquiry, chat, api TypeScript types
    validation/                # enquirySchema (Zod, mirrors backend rules)
    utils/                      # siteContent, formatDate, statusColors, stringSimilarity, intents
```

## Setup Instructions

### 1. Install dependencies
```bash
cd frontend
npm install
```

### 2. Configure environment variables
```bash
cp .env.example .env
```
| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL of the backend API, e.g. `http://localhost:5000/api` |

### 3. Run the app
```bash
npm run dev       # starts Vite dev server on http://localhost:5173
npm run build     # type-checks and builds to dist/
npm run preview   # preview the production build locally
```

Make sure the backend is running first (see `backend/README.md`) so the frontend has an API to talk to.

## Feature Overview

- **Home / Services / Courses / Contact** — fully responsive public pages with an original dark, tech-forward visual direction (not a copy of dronetv.in)
- **Chatbot** (`/chatbot` page + floating widget on every page) — rule-based, intent-matching engine (keyword + synonym scoring with Levenshtein fuzzy matching for typo tolerance), covering all required sample questions, with:
  - Session-only conversation history
  - Quick-reply chips
  - Graceful fallback for unmatched questions
  - A reset button that clears the conversation
  - An in-chat lead-capture flow that submits directly to the backend, including the full transcript
- **Enquiry form** — one shared, validated component (`EnquiryForm`) used by the Contact page and the "Enquire" buttons on Services/Courses, so validation rules live in exactly one place
- **Admin dashboard** (`/admin/login`, `/admin/dashboard`) — JWT-cookie protected route; search, status/user-type filters, pagination, a details drawer for viewing the full record, changing status, adding notes, and deleting (with a confirmation step), plus stats cards fed by the backend's aggregation endpoint

## Notes

- The chatbot's intent matching runs entirely client-side in `services/chatbotEngine.ts` behind a single `resolveIntent()` function, so swapping in a real LLM later only touches that one file.
- Frontend validation (Zod + React Hook Form) exists purely for UX — the backend independently re-validates every request and is the actual source of truth.
