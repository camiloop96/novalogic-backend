import { Module } from "@nestjs/common";
import { RedisService } from "@config/redis.config";

@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
