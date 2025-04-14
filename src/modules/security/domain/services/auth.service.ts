import { LoginDto } from "modules/security/application/dto/in/login.dto";
import { AuthResponseDto } from "modules/security/application/dto/out/login.response.dto";

export abstract class AuthService {
  abstract login(loginDto: LoginDto): Promise<AuthResponseDto>;
  abstract logout(token: string): Promise<void>;
}
