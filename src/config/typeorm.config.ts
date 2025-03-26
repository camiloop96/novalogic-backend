import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import "dotenv/config";
import { DataSource } from "typeorm";

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env;

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: POSTGRES_HOST || "localhost",
  port: Number(POSTGRES_PORT) || 5432,
  username: POSTGRES_USER || "novatrack",
  password: POSTGRES_PASSWORD || "novatrack123",
  database: POSTGRES_DB || "novatrack_db",
  autoLoadEntities: true,
  synchronize: false,
  logging: true,
  migrationsRun: true,
  migrations: ["dist/**/migrations/*.js"],
  entities: ["dist/**/entities/*.js"],
};

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
