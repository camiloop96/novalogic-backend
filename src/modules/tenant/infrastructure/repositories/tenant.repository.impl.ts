import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QueryRunner, Repository } from "typeorm";
import { TenantModel } from "../models/tenant.model";
import { TenantRepository } from "modules/tenant/domain/repository/tenant.repository";
import { Tenant } from "modules/tenant/domain/entities/tenant.entity";

@Injectable()
export class TenantRepositoryImpl implements TenantRepository {
  constructor(
    @InjectRepository(TenantModel)
    private readonly repo: Repository<TenantModel>
  ) {}

  /** CREATE TENANT */
  async create(tenant: Tenant, queryRunner?: QueryRunner): Promise<Tenant> {
    const tenantModel = this.toPersistence(tenant);
    const repo = queryRunner?.manager.getRepository(TenantModel) ?? this.repo;
    const savedModel = await repo.save(tenantModel);
    return this.toDomain(savedModel);
  }

  /** FIND TENANT BY ID */
  async findById(id: string): Promise<Tenant | null> {
    const found = await this.repo.findOne({ where: { id } });
    return found ? this.toDomain(found) : null;
  }

  /** FIND TENANT BY TENANT ID */
  async findByTenantId(tenantId: string): Promise<Tenant | null> {
    const found = await this.repo.findOne({ where: { tenantId } });
    return found ? this.toDomain(found) : null;
  }

  /** FIND ALL TENANTS */
  async findAll(): Promise<Tenant[]> {
    const found = await this.repo.find();
    return found.map((model) => this.toDomain(model));
  }

  /** PARTIAL TO PERSISTENCE */
  private partialToPersistence(partial: Partial<Tenant>): Partial<TenantModel> {
    const model: Partial<TenantModel> = {};

    if (partial.getTenantName) {
      model.tenantName = partial.getTenantName() ?? undefined;
    }

    if (partial.getTenantIdType) {
      model.tenantIdType = partial.getTenantIdType() ?? undefined;
    }

    if (partial.getTenantId) {
      model.tenantId = partial.getTenantId() ?? undefined;
    }

    if (partial.getPersonType) {
      model.personType = partial.getPersonType() ?? undefined;
    }

    if (partial.getSubscriptionPlan) {
      model.subscriptionPlan = partial.getSubscriptionPlan() ?? undefined;
    }

    if (partial.getCurrency) {
      model.currency = partial.getCurrency() ?? undefined;
    }

    return model;
  }

  /** UPDATE TENANT */
  async update(
    id: string,
    tenant: Partial<Tenant>,
    queryRunner?: QueryRunner
  ): Promise<Tenant | null> {
    const updateData = this.partialToPersistence(tenant);
    const repo = queryRunner?.manager.getRepository(TenantModel) ?? this.repo;
    await repo.update(id, updateData);
    const updated = await this.repo.findOne({ where: { id } });
    return updated ? this.toDomain(updated) : null;
  }

  /** DELETE TENANT */
  async delete(id: string, queryRunner?: QueryRunner): Promise<void> {
    const repo = queryRunner?.manager.getRepository(TenantModel) ?? this.repo;
    await repo.delete(id);
  }

  /** MAP DOMAIN TO PERSISTENCE */
  private toPersistence(entity: Tenant): TenantModel {
    const model = new TenantModel();
    model.tenantName = entity.getTenantName();
    model.tenantId = entity.getTenantId();
    model.tenantIdType = entity.getTenantIdType();
    model.personType = entity.getPersonType();
    model.subscriptionPlan = entity.getSubscriptionPlan();
    model.currency = entity.getCurrency();
    return model;
  }

  /** MAP PERSISTENCE TO DOMAIN */
  private toDomain(model: TenantModel): Tenant {
    const personType =
      model.personType === "natural" || model.personType === "juridica"
        ? model.personType
        : "natural";

    return new Tenant({
      tenantName: model.tenantName,
      tenantIdType: model.tenantIdType,
      tenantId: model.tenantId,
      personType: personType,
      subscriptionPlan: model.subscriptionPlan,
      currency: model.currency,
      id: model.id,
    });
  }
}
