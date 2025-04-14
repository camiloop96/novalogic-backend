import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setupSwagger } from "@config/swagger.config";
import morgan from "morgan";
import { AppLogger } from "@config/logger.config";
import helmet from "helmet";
import { JwtBlacklistMiddleware } from "modules/security/infrastructure/middlewares/jwt-blacklist.middleware";
import cors from "cors";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilita CORS
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );

  // Logger Personalizado
  const logger = new AppLogger();
  app.useLogger(new AppLogger());

  // Captura de errores
  app.enableShutdownHooks();

  // Morgan para registro de solicitudes HTTP
  app.use(morgan("combined"));

  // Configura Swagger
  setupSwagger(app);

  // Middleware de seguridad
  app.use(helmet());

  // Trae el puerto de las variables de entorno, por defecto 3000
  const PORT = process.env.PORT || 3000;

  /** Inicialización del server */
  await app.listen(PORT);

  logger.log("🚀 Server running on http://localhost:3000");
  logger.log("📚 Swagger Docs on http://localhost:3000/api/docs");
}

/** Inicialización del bootstrap */
bootstrap().catch((err) => {
  console.error("🔥 Error during bootstrap:", err);
});
