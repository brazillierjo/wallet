# Frontend

## 🏗️ Architecture

- Built with [Next.js](https://nextjs.org/) 15 using App Router
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for beautiful and accessible components
- Modern and responsive design

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed on your machine
- Git for cloning the repository

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
frontend/
├── app/                # App router pages
├── components/         # React components
├── public/            # Static files
└── package.json       # Frontend dependencies
```

## 🛠️ Development

The application is configured for development with hot-reload enabled. Any changes you make to the code will automatically trigger a rebuild.

### Git Hooks

The project uses Husky and lint-staged to ensure code quality:

- **Pre-commit**: Runs ESLint and Prettier on staged files
- **Pre-push**: Verifies that the build passes

These hooks are automatically installed when you run `npm install`. They help maintain code quality by:

- Preventing commits with linting errors
- Ensuring the build passes before pushing
- Automatically formatting code according to project standards

## 📜 Available Scripts

```bash
# Start development server
npm run dev

# Build the application
npm run build

# Start production server
npm run start

# Run tests
npm run test

# Lint the code
npm run lint
```

## 📝 Environment Variables

Create a `.env` file in the root of the frontend directory with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# Port configuration
PORT=3000

# Node Environment
NODE_ENV=development
```
