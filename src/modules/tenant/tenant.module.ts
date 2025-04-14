import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TenantModel } from "./infrastructure/models/tenant.model";
import { TenantCreationService } from "./domain/services/create-tenant.service";
import { TenantCreationServiceImpl } from "./application/services/create-tenant.service.impl";
import { RepresentativeModel } from "./infrastructure/models/representative.model";
import { ContactModel } from "./infrastructure/models/contact.model";
import { RepresentativeRepository } from "./domain/repository/representative.repository";
import { RepresentativeRepositoryImpl } from "./infrastructure/repositories/representative.repository.impl";
import { ContactRepository } from "./domain/repository/contact.repository";
import { ContactRepositoryImpl } from "./infrastructure/repositories/contact.repository.impl";
import { TenantController } from "./infrastructure/controllers/create-tenant-controller";
import { TenantRepository } from "./domain/repository/tenant.repository";
import { TenantRepositoryImpl } from "./infrastructure/repositories/tenant.repository.impl";
import { SecurityModule } from "modules/security/security.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([TenantModel, RepresentativeModel, ContactModel]),
    SecurityModule,
  ],
  providers: [
    {
      provide: TenantRepository,
      useClass: TenantRepositoryImpl,
    },
    {
      provide: TenantCreationService,
      useClass: TenantCreationServiceImpl,
    },
    {
      provide: RepresentativeRepository,
      useClass: RepresentativeRepositoryImpl,
    },
    {
      provide: ContactRepository,
      useClass: ContactRepositoryImpl,
    },
  ],
  controllers: [TenantController],
  exports: [TenantCreationService],
})
export class TenantModule {}
