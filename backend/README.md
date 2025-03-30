# Backend

## 🏗️ Architecture

- Built with [Bun](https://bun.sh/) for ultra-fast JavaScript runtime
- Uses [Elysia](https://elysiajs.com/) as the web framework
- [Prisma](https://www.prisma.io/) for database management
- PostgreSQL as the database

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine
- PostgreSQL 17 installed and running locally
- Git for cloning the repository

### Installation

1. Install dependencies:

```bash
bun install
```

2. Set up the database:

```bash
bunx prisma generate
bunx prisma db push
```

3. Start the development server:

```bash
bun run dev
```

The backend will be available at [http://localhost:3001](http://localhost:3001)

## 📁 Project Structure

```
backend/
├── src/               # Source files
├── prisma/           # Prisma schema and migrations
└── package.json      # Backend dependencies
```

## 🛠️ Development

The application is configured for development with hot-reload enabled. Any changes you make to the code will automatically trigger a rebuild.

## 📜 Available Scripts

```bash
# Start development server
bun run dev

# Build the application
bun run build

# Start production server
bun run start

# Run tests
bun run test

# Generate Prisma client
bunx prisma generate

# Push database schema
bunx prisma db push

# Open Prisma Studio
bunx prisma studio
```

## 📝 Environment Variables

Create a `.env` file in the root of the backend directory with the following variables:

```env
# PostgreSQL
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=where-do-i-spend
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/where-do-i-spend?schema=public"

# Port configuration
PORT=3001

# JWT
JWT_SECRET=your_jwt_secret

# Node Environment
NODE_ENV=development
```
