import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CredentialsRepository } from "modules/security/domain/repository/credential.repository";
import * as bcrypt from "bcrypt";
import { LoginDto } from "../dto/in/login.dto";
import { AuthResponseDto } from "../dto/out/login.response.dto";
import { UserRepository } from "modules/security/domain/repository/user.repository";
import { TokenBlacklistRepository } from "modules/security/domain/repository/token-blacklist.repository";
import { AuthService } from "modules/security/domain/services/auth.service";

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly credentialsRepository: CredentialsRepository,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly tokenBlacklistRepository: TokenBlacklistRepository
  ) {}

  /** 🏷️ Autentica al usuario y retorna el token, rol y datos del usuario */
  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { username, password } = loginDto;

    // 🔍 Busca las credenciales por el nombre de usuario
    const credentials =
      await this.credentialsRepository.findByUsername(username);

    if (!credentials) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // 🔑 Verifica la contraseña
    const isPasswordValid = await bcrypt.compare(
      password,
      credentials.getPassword()
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // 🔍 Busca el usuario relacionado con las credenciales
    const user = await this.userRepository.findByCredentialsId(
      credentials.getId()!
    );
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    // 🏷️ Genera el token JWT con el payload
    const payload = {
      sub: user.getId(),
      role: user.getRole(),
      username: credentials.getUsername(),
    };
    const token = this.jwtService.sign(payload);

    // 🏷️ Retorna el DTO de respuesta con el token y datos del usuario
    return new AuthResponseDto(
      token,
      user.getRole(),
      user.getId()!,
      user.getFullName()
    );
  }

  /** 🏷️ Invalida el token y lo agrega a la blacklist */
  async logout(token: string): Promise<void> {
    try {
      const decodedToken = this.jwtService.decode(token) as {
        exp: number;
      } | null;
      if (!decodedToken || !decodedToken.exp) {
        throw new UnauthorizedException("Invalid token");
      }

      const expiresIn = decodedToken.exp - Math.floor(Date.now() / 1000);
      if (expiresIn > 0) {
        await this.tokenBlacklistRepository.addToBlacklist(token, expiresIn);
      }
    } catch (error) {
      throw new UnauthorizedException("Logout failed");
    }
  }
}
