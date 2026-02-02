# Developer Guide

## Prerequisites

- Node.js v18+ and npm
- MongoDB v6+
- Docker & Docker Compose (optional)
- Git

## Quick Start

### 1. Clone and Setup

```bash
git clone https://github.com/Sampradayam/ksg-platform.git
cd ksg-platform
git checkout main
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

Backend runs on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

Frontend runs on `http://localhost:5173`

### 4. Docker Setup (Alternative)

```bash
docker-compose up --build
```

## Project Structure

```
ksg-platform/
├── backend/
│   ├── src/
│   │   └── modules/          # Feature modules
│   │       ├── identity/     # Auth, users, RBAC
│   │       ├── courses/
│   │       ├── admissions/
│   │       ├── helpline/
│   │       ├── festivals/
│   │       ├── tourism/
│   │       ├── content/
│   │       ├── ai/
│   │       └── admin/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   └── src/
│       ├── modules/          # Feature modules
│       │   ├── auth/
│       │   ├── courses/
│       │   ├── admissions/
│       │   ├── helpline/
│       │   ├── festivals/
│       │   ├── tourism/
│       │   ├── admin/
│       │   └── ai/
│       ├── components/
│       ├── pages/
│       └── api.js
├── docs/                     # Documentation
├── devops/                   # CI/CD configs
└── .github/                  # GitHub workflows
```

## Module Development

### Backend Module Structure

```
backend/src/modules/<module-name>/
├── controllers/
├── models/
├── routes/
├── services/
├── validators/
└── index.js
```

### Frontend Module Structure

```
frontend/src/modules/<module-name>/
├── components/
├── pages/
├── hooks/
├── services/
└── index.js
```

## Common Commands

### Backend

```bash
npm run dev          # Start development server
npm start            # Start production server
npm test             # Run tests
npm run lint         # Lint code
```

### Frontend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm test             # Run tests
npm run lint         # Lint code
```

## Environment Variables

See `.env.example` files in `backend/` and `frontend/` directories for required configuration.

## Database

### MongoDB Connection

Default: `mongodb://localhost:27017/ksg-platform`

### Running Migrations

```bash
cd backend
npm run migrate
```

## Testing

### Backend Tests

```bash
cd backend
npm test                    # Run all tests
npm test -- --watch        # Watch mode
npm run test:coverage      # Coverage report
```

### Frontend Tests

```bash
cd frontend
npm test                    # Run all tests
npm test -- --watch        # Watch mode
npm run test:coverage      # Coverage report
```

## Debugging

### Backend (VS Code)

Add to `.vscode/launch.json`:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Backend",
  "program": "${workspaceFolder}/backend/server.js",
  "cwd": "${workspaceFolder}/backend"
}
```

### Frontend (Browser DevTools)

Use React DevTools extension and browser console.

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5000 (backend)
npx kill-port 5000

# Kill process on port 5173 (frontend)
npx kill-port 5173
```

### MongoDB Connection Issues

- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Code Style

- Use ESLint configuration provided
- Follow Airbnb JavaScript Style Guide
- Use Prettier for formatting
- Write meaningful commit messages

## Getting Help

- Check existing documentation in `docs/`
- Review API contracts in `docs/API_CONTRACT.md`
- Contact module owners (see `docs/OWNERSHIP.md`)
- Create an issue on GitHub
