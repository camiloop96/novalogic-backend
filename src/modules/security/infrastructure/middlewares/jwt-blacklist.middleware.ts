import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { RedisTokenBlacklistRepository } from "../persistence/repositories/redis.token-blacklisted.impl";

@Injectable()
export class JwtBlacklistMiddleware implements NestMiddleware {
  constructor(
    private readonly tokenBlacklistRepo: RedisTokenBlacklistRepository
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    const isBlacklisted = await this.tokenBlacklistRepo.isBlacklisted(token);
    if (isBlacklisted) {
      return res.status(401).json({ message: "Token is blacklisted" });
    }

    next();
  }
}
