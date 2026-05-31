# Mahin AI

Mahin AI is a production-oriented AI chatbot platform with:

- **Backend API**: Node.js + Express + MongoDB + Redis + Ollama (Qwen 2.5 3B) + Cloudinary + Resend
- **Web App**: React + TypeScript (Vite)
- **Mobile App**: Flutter

## Monorepo Structure

- `/backend` – API, auth, chat engine, admin endpoints, file upload, security middleware
- `/web` – responsive dashboard/chat/profile/admin web client
- `/mobile` – Flutter mobile client for login + chat

## Backend Setup

```bash
cd /tmp/workspace/saraahmad1325/MahinAi/backend
cp .env.example .env
npm install
npm run dev
```

### Backend Scripts

- `npm run dev` – start in dev mode
- `npm run build` – compile TypeScript
- `npm run start` – run compiled server
- `npm run lint` – lint backend code
- `npm run test` – run backend tests

## Web Setup

```bash
cd /tmp/workspace/saraahmad1325/MahinAi/web
cp .env.example .env
npm install
npm run dev
```

## Flutter Mobile Setup

Install Flutter SDK first, then:

```bash
cd /tmp/workspace/saraahmad1325/MahinAi/mobile
flutter pub get
flutter run --dart-define=API_BASE_URL=http://10.0.2.2:8080
```

## Implemented Capabilities

- JWT authentication with refresh token flow
- Role-based authorization (user/admin)
- AI chat endpoint backed by Ollama/Qwen
- MongoDB chat history persistence
- Redis response caching
- Cloudinary file upload endpoint
- Resend email integration for onboarding email
- Security middleware (Helmet, CORS, rate limiting, validation, centralized errors)
- Health + metrics endpoints for monitoring
- Web: auth, dashboard, chat, profile/settings, admin dashboard
- Mobile: auth + chat workflow
