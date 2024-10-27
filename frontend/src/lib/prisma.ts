import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const exitHandler = () => {
  prisma.$disconnect();
};

process.on("SIGINT", exitHandler);
process.on("SIGTERM", exitHandler);

export default prisma;

(async () => {
  try {
    await prisma.$connect();
    console.log("Prisma Client initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize Prisma Client:", error);
  }
})();
