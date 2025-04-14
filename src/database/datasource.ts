import { DataSource } from "typeorm";
import "dotenv/config";

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env;

export const dataSource = new DataSource({
  type: "postgres",
  host: POSTGRES_HOST || "localhost",
  port: Number(POSTGRES_PORT) || 5432,
  username: POSTGRES_USER || "novatrack",
  password: POSTGRES_PASSWORD || "novatrack123",
  database: POSTGRES_DB || "novatrack_db",
  migrations: ["src/**/migrations/*.ts"],
  entities: ["src/**/entities/*.ts"],
});
