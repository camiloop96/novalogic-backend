import { CreateTenantDto } from "modules/tenant/application/dto/in/create-tenant.dto";
import { Tenant } from "../entities/tenant.entity";

export abstract class TenantCreationService {
  abstract createTenant(dto: CreateTenantDto): Promise<Tenant>;
}
