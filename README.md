# AI-Todos

A modern todo application with Next.js frontend, Nest.js backend, PostgreSQL, and Drizzle ORM.

## Tech Stack

- **Frontend**: Next.js with Tailwind CSS
- **Backend**: Nest.js REST API
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **DevOps**: Docker Compose for local development
- **Monorepo**: Turborepo for managing the monorepo structure

## Project Structure

This is a monorepo using Turborepo with the following structure:

- `apps/web`: Next.js frontend application
- `apps/api`: Nest.js backend API
- `packages/database`: Shared database schema and Drizzle configuration

## Features

- ✅ Create, read, update, and delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Responsive UI with Tailwind CSS
- ✅ Clean and intuitive user interface
- ✅ RESTful API with Swagger documentation
- ✅ PostgreSQL database with Drizzle ORM
- ✅ Monorepo architecture for code sharing
- 🔜 User authentication (planned)
- 🔜 Filter and search todos (planned)
- 🔜 Due dates and reminders (planned)

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

4. Set up environment variables:
   - Copy `.env.example` to `.env` in both `apps/api` and `apps/web` directories
   - Update the variables if needed (default values should work for local development)

5. Push the database schema:
```bash
npm run db:push
# or
pnpm db:push
```

6. Start the development servers:
```bash
npm run dev
# or
pnpm dev
```

The applications will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Documentation: http://localhost:3001/api/docs

## API Endpoints

The API provides the following endpoints:

- `GET /todos` - Get all todos
- `GET /todos/:id` - Get a specific todo
- `POST /todos` - Create a new todo
- `PATCH /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo

## Development

### Database Changes

To make changes to the database schema:

1. Edit the schema files in `packages/database/src/schema/`
2. Run the migration:
```bash
npm run db:push
# or
pnpm db:push
```

### Adding New Features

1. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes to the codebase
3. Test your changes locally
4. Create a pull request for review

## Production Deployment

For production deployment:

1. Build the applications:
```bash
npm run build
# or
pnpm build
```

2. Set up a production PostgreSQL database
3. Configure environment variables for production
4. Deploy the frontend and backend applications

## License

MIT
