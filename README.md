# Walletoo

## 🏗️ Architecture

This project is split into two main parts:

### Backend (`/backend`)
- Built with [Bun](https://bun.sh/) for ultra-fast JavaScript runtime
- Uses [Elysia](https://elysiajs.com/) as the web framework
- [Prisma](https://www.prisma.io/) for database management
- PostgreSQL as the database

### Frontend (`/frontend`)
- Built with [Next.js](https://nextjs.org/) 14 using App Router
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for beautiful and accessible components
- Modern and responsive design

## 🚀 Quick Start

### Prerequisites
- [Docker](https://www.docker.com/) and Docker Compose installed on your machine
- Git for cloning the repository

### Installation

1. Clone the repository

2. Create necessary environment files

3. Start the application using Docker
```bash
docker compose up --build
```

## 📍 Access Points

Once the application is running, you can access:
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:3001](http://localhost:3001)
- Prisma Studio: [http://localhost:5555](http://localhost:5555)

## 📁 Project Structure

```
walletoo/
├── frontend/                # Next.js frontend application
│   ├── app/                # App router pages
│   ├── components/         # React components
│   └── public/            # Static files
│
├── backend/                # Bun backend application
│   ├── src/               # Source files
│   ├── prisma/            # Prisma schema and migrations
│   └── package.json       # Backend dependencies
│
└── docker-compose.yml     # Docker composition file
```

## 🛠️ Development

The application is configured for development with hot-reload enabled. Any changes you make to the frontend or backend code will automatically trigger a rebuild of the affected parts.

## 📜 Available Scripts

In the project directory, you can run:

```bash
# Start all services
docker compose up

# Rebuild and start all services
docker compose up --build

# Stop all services
docker compose down

# Stop all services and remove volumes
docker compose down -v
```

## 📝 License

[MIT](LICENSE)
