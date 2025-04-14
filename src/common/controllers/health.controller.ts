import { DatabaseHealthService } from "@common/services/db-health.service";
import { Controller, Get, Logger } from "@nestjs/common";

@Controller("health")
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor(private readonly databaseHealthService: DatabaseHealthService) {}

  @Get("database")
  async checkDatabase() {
    this.logger.log("🛑 Health check triggered...");
    return await this.databaseHealthService.checkDatabaseHealth();
  }
}
