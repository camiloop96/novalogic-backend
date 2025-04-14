import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "modules/security/application/dto/in/login.dto";
import { AuthResponseDto } from "modules/security/application/dto/out/login.response.dto";
import { JwtAuthGuard } from "../guards/jwt.auth.guard";
import { Response, Request } from "express";
import { AuthService } from "modules/security/domain/services/auth.service";

export interface ExtendedRequest extends Request {
  token?: string;
}

@ApiTags("Auth")
@Controller("api/security/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** 🔑 Iniciar sesión y obtener el token */
  @Post("login")
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: "Inicio de sesión exitoso",
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: "Credenciales inválidas",
  })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return await this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  @ApiResponse({ status: 200, description: "Sesión cerrada exitosamente" })
  @ApiBody({ description: "Token for logout", required: false })
  @ApiResponse({
    status: 401,
    description: "Token inválido o no proporcionado",
  })
  async logout(
    @Req() req: ExtendedRequest,
    @Res({ passthrough: true }) res: Response
  ) {
    const { token } = req;

    if (!token) {
      throw new UnauthorizedException("Token no proporcionado");
    }

    await this.authService.logout(token);

    return {
      statusCode: 200,
      message: "Sesión cerrada exitosamente",
      data: null,
    };
  }
}
