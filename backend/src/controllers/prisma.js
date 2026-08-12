const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg-pool");

// Your PostgreSQL connection string
const connectionString =
  "postgresql://postgres:your_password@localhost:5433/talent_platform";

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

module.exports = prisma;