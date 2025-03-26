import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setupSwagger } from "@config/swagger.config";
import morgan from "morgan";
import { AppLogger } from "@config/logger.config";
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilita CORS
  app.enableCors();

  // Logger Personalizado
  const logger = new AppLogger();
  app.useLogger(new AppLogger());

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
bootstrap();
