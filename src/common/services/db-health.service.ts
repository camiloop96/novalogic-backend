import { Injectable, Logger } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class DatabaseHealthService {
  private readonly logger = new Logger(DatabaseHealthService.name);

  constructor(private dataSource: DataSource) {}

  async checkDatabaseHealth() {
    this.logger.log("ℹ️ Checking database health...");
    try {
      await this.dataSource.query("SELECT 1");
      this.logger.log("✅ Database connection is healthy");
      return { status: "healthy" };
    } catch (error: any) {
      this.logger.error("❌ Database connection failed", error.message);
      return { status: "unhealthy", error: error.message };
    }
  }
}
