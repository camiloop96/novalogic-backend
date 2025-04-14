import { QueryRunner } from "typeorm";
import { Tenant } from "../entities/tenant.entity";

export abstract class TenantRepository {
  abstract create(tenant: Tenant, queryRunner?: QueryRunner): Promise<Tenant>;
  abstract findById(id: string): Promise<Tenant | null>;
  abstract findByTenantId(tenantId: string): Promise<Tenant | null>;
  abstract findAll(): Promise<Tenant[]>;
  abstract update(
    id: string,
    tenant: Partial<Tenant>,
    queryRunner?: QueryRunner
  ): Promise<Tenant | null>;
  abstract delete(id: string, queryRunner?: QueryRunner): Promise<void>;
}
