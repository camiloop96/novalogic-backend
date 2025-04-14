import { Injectable } from "@nestjs/common";
import { createClient, RedisClientType } from "redis";

@Injectable()
export class RedisService {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      socket: {
        host: "localhost", // Asegúrate de que este sea el host correcto
        port: 6379,
      },
    });

    this.client
      .connect()
      .catch((err: any) => console.error("❌ Error conectando a Redis:", err));
  }

  async set(key: string, value: string, options?: { EX: number }) {
    return this.client.set(key, value, options);
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }
}
