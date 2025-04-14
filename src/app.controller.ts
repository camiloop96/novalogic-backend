import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  getStatus() {
    return { status: "NovaTrack API is running!" };
  }
}
