# Wallet Application

This project is a wallet management application that allows users to visualize their expenses to better understand their spending habits.

## Project Structure

The project is divided into two main parts:

### Frontend (`/frontend`)

- Web application built with Next.js
- Modern and responsive user interface
- Styling with Tailwind CSS
- TypeScript for type-safe development

### Backend (`/backend`)

- REST API built with Node.js
- Database managed with Prisma ORM
- TypeScript for type-safe development
- API documentation with Postman

## Technologies Used

### Frontend

- **Next.js** - React framework for web development
- **TypeScript** - Typed programming language
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint & Prettier** - Code linting and formatting tools

### Backend

- **Node.js** - JavaScript runtime environment
- **TypeScript** - Typed programming language
- **Prisma** - Modern ORM for database management
- **Postman** - API documentation and testing

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Database (configured in the backend)

### Unified Installation

To install all project dependencies with a single command:

```bash
npm run install:all
```

This command will install dependencies for:

- Root project
- Frontend
- Backend

### Unified Development

To run all services in parallel (frontend, backend, and Prisma Studio):

```bash
npm run dev
```

This command will start:

- Next.js frontend on port 3000
- Backend on its default port
- Prisma Studio on port 5555

Logs from all services will be displayed in the same terminal with different colors for better readability.

### Separate Installation

If you prefer to install and start services separately:

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

#### Backend

```bash
cd backend
npm install
npm run dev
```

## GitHub Actions

The project uses GitHub Actions for deployment automation. A workflow is configured to automatically deploy the application to a VPS when changes are pushed to the `main` and `dev` branches. The deployment includes:

- Dependencies installation
- Database migration
- Frontend and backend application build and startup
- Production and pre-production environment management via different git branches

## Configuration

`.env` files are required for both frontend and backend. Make sure to configure them correctly by following the examples provided in their respective directories.

## Documentation

- API documentation is available in the backend's `routes.md` file
- Postman collections are available in the `postman.json` file
- Each project part (frontend and backend) has its own README with detailed instructions

## Contributing

1. Fork the project
2. Create your branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
