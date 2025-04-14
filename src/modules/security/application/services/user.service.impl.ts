import { Injectable } from "@nestjs/common";
import { UserRepository } from "modules/security/domain/repository/user.repository";
import { CreateUserDto, UpdateUserDto } from "../dto/in/user.dto";
import { User } from "modules/security/domain/entities/user.entity";
import { Credentials } from "modules/security/domain/entities/credential.entity";
import { CredentialsRepository } from "modules/security/domain/repository/credential.repository";
import { UserService } from "modules/security/domain/services/user.service";

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly credentialsRepository: CredentialsRepository
  ) {}

  /** ✅ CREATE USER */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const userId = crypto.randomUUID();
    const credentialsId = crypto.randomUUID();

    // 🔑 Crea y guarda las credenciales del usuario
    const credentials = new Credentials({
      id: credentialsId,
      username: createUserDto.email,
      password: createUserDto.password,
    });
    await this.credentialsRepository.create(credentials);

    // 🏷️ Crea y guarda el usuario asociado a las credenciales
    const user = new User({
      id: userId,
      fullName: createUserDto.fullName,
      email: createUserDto.email,
      phoneNumber: createUserDto.phoneNumber || null,
      role: createUserDto.role,
      tenantId: createUserDto.tenantId,
      credentials: credentials,
    });
    return await this.userRepository.create(user);
  }

  /** 🔍 GET USER BY ID */
  async getUserById(id: string): Promise<User | null> {
    // Busca y devuelve el usuario por su ID
    return await this.userRepository.findById(id);
  }

  /** 📜 GET ALL USERS */
  async getAllUsers(): Promise<User[]> {
    // Obtiene y devuelve una lista de todos los usuarios
    return await this.userRepository.findAll();
  }

  /** ✏️ UPDATE USER */
  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<User | null> {
    // Actualiza los datos del usuario y devuelve el resultado actualizado
    return await this.userRepository.update(id, updateUserDto);
  }

  /** 🗑️ DELETE USER */
  async deleteUser(id: string): Promise<void> {
    // Elimina el usuario por su ID
    await this.userRepository.delete(id);
  }
}
