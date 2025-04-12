# AI-Todos

A todo application with Next.js frontend, Nest.js backend, PostgreSQL, and Drizzle ORM.

## Tech Stack

- **Frontend**: Next.js
- **Backend**: Nest.js
- **Database**: PostgreSQL
- **ORM**: Drizzle
- **DevOps**: Docker Compose for local development

## Project Structure

This is a monorepo using Turborepo with the following structure:

- `apps/web`: Next.js frontend application
- `apps/api`: Nest.js backend API
- `packages/database`: Shared database schema and Drizzle configuration

## Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js (>= 18.0.0)
- Docker and Docker Compose
- PNPM (recommended) or NPM

### Installation

1. Clone the repository:
```bash
git clone https://github.com/auaden/ai-todos.git
cd ai-todos
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Start PostgreSQL database:
```bash
docker-compose up -d
```

4. Push the database schema:
```bash
npm run db:push
# or
pnpm db:push
```

5. Start the development servers:
```bash
npm run dev
# or
pnpm dev
```

The applications will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Features

- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Filter todos by status
- User authentication (planned)

## License

MIT
