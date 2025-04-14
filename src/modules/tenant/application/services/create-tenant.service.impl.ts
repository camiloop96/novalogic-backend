import { ConflictException, Injectable } from "@nestjs/common";
import { Tenant } from "modules/tenant/domain/entities/tenant.entity";
import { ContactRepository } from "modules/tenant/domain/repository/contact.repository";
import { RepresentativeRepository } from "modules/tenant/domain/repository/representative.repository";
import { TenantRepository } from "modules/tenant/domain/repository/tenant.repository";
import { TenantCreationService } from "modules/tenant/domain/services/create-tenant.service";
import { CreateTenantDto } from "../dto/in/create-tenant.dto";
import { Contact } from "modules/tenant/domain/entities/tenant-contact.entity";
import { Representative } from "modules/tenant/domain/entities/tenant-representative.entity";
import { UserRepository } from "modules/security/domain/repository/user.repository";
import { CredentialsRepository } from "modules/security/domain/repository/credential.repository";
import { PasswordEncryptionService } from "modules/security/domain/services/password.service";
import { Credentials } from "modules/security/domain/entities/credential.entity";
import { Role } from "modules/security/domain/entities/roles.enum";
import { User } from "modules/security/domain/entities/user.entity";
import { runInTransaction } from "@common/utils/transaction.util";
import { DataSource } from "typeorm";

@Injectable()
export class TenantCreationServiceImpl implements TenantCreationService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly tenantRepository: TenantRepository,
    private readonly representativeRepository: RepresentativeRepository,
    private readonly contactRepository: ContactRepository,
    private readonly userRepository: UserRepository,
    private readonly credentialsRepository: CredentialsRepository,
    private readonly passwordEncryptionService: PasswordEncryptionService
  ) {}

  async createTenant(dto: CreateTenantDto): Promise<Tenant> {
    return await runInTransaction(this.dataSource, async (queryRunner) => {
      // Verificar que no exista un Tenant con el mismo número de identificación
      const existingTenant = await this.tenantRepository.findByTenantId(
        dto.tenant.tenantId
      );
      if (existingTenant) {
        throw new ConflictException(
          "Ya existe un tenant con el mismo número de identificación"
        );
      }

      // Verificar que no exista un Representative con el mismo número de identificación
      let representative =
        await this.representativeRepository.findByRepresentativeId(
          dto.representative.representativeId
        );

      if (!representative) {
        representative = new Representative({
          representativeName: dto.representative.representativeName,
          representativeIdType: dto.representative.representativeIdType,
          representativeId: dto.representative.representativeId,
          tenantId: "",
        });
      }

      const tenant = new Tenant({
        tenantName: dto.tenant.tenantName,
        tenantIdType: dto.tenant.tenantIdType,
        tenantId: dto.tenant.tenantId,
        personType: dto.tenant.personType,
        subscriptionPlan: dto.tenant.subscriptionPlan,
        currency: dto.tenant.currency,
      });

      // Persistir las entidades en la base de datos.
      const createdTenant = await this.tenantRepository.create(
        tenant,
        queryRunner
      );

      // Crear la entidad Representative a partir del DTO
      representative.setTenantId(createdTenant.getId()!);
      await this.representativeRepository.create(representative, queryRunner);

      // Crear la entidad Contact a partir del DTO
      const contact = new Contact({
        email: dto.contact.email,
        website: dto.contact.website,
        department: dto.contact.department,
        city: dto.contact.city,
        address: dto.contact.address,
      });

      await this.contactRepository.create(contact, queryRunner);

      // Crear el usuario administrador del tenant utilizando el nombre del representante legal
      const hashedPassword = await this.passwordEncryptionService.hashPassword(
        dto.tenant.tenantPassword
      );

      // Crear las credenciales con el password encriptado
      const user = new User({
        fullName: representative.getRepresentativeName(),
        email: dto.contact.email,
        phoneNumber: dto.contact.phoneNumber || null,
        role: Role.TENANT_ADMIN,
        tenantId: createdTenant.getId()!,
        credentials: null,
      });

      const credentials = new Credentials({
        username: representative.getRepresentativeName(),
        password: hashedPassword,
        isActive: true,
        user: user,
      });

      await this.credentialsRepository.create(credentials, queryRunner);

      // Crear el usuario con role TENANT_ADMIN, asociando el tenant recién creado y las credenciales creadas.
      await this.userRepository.create(user, queryRunner);

      return createdTenant;
    });
  }
}
