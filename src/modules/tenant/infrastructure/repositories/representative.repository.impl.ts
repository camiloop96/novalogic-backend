import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Representative } from "modules/tenant/domain/entities/tenant-representative.entity";
import { RepresentativeRepository } from "modules/tenant/domain/repository/representative.repository";
import { QueryRunner, Repository } from "typeorm";
import { RepresentativeModel } from "../models/representative.model";

@Injectable()
export class RepresentativeRepositoryImpl implements RepresentativeRepository {
  constructor(
    @InjectRepository(RepresentativeModel)
    private readonly repo: Repository<RepresentativeModel>
  ) {}

  /** CREATE REPRESENTATIVE */
  async create(
    representative: Representative,
    queryRunner?: QueryRunner
  ): Promise<Representative> {
    const representativeModel = this.toPersistence(representative);
    const repo =
      queryRunner?.manager.getRepository(RepresentativeModel) ?? this.repo;
    const savedModel = await repo.save(representativeModel);
    return this.toDomain(savedModel);
  }

  /** FIND REPRESENTATIVE BY ID */
  async findById(id: string): Promise<Representative | null> {
    const found = await this.repo.findOne({ where: { id } });
    return found ? this.toDomain(found) : null;
  }

  /** FIND REPRESENTATIVE BY REPRESENTATIVE ID */
  async findByRepresentativeId(
    representativeId: string
  ): Promise<Representative | null> {
    const found = await this.repo.findOne({ where: { representativeId } });
    return found ? this.toDomain(found) : null;
  }

  /** FIND ALL REPRESENTATIVES */
  async findAll(): Promise<Representative[]> {
    const found = await this.repo.find();
    return found.map((model) => this.toDomain(model));
  }

  private partialToPersistence(
    partial: Partial<Representative>
  ): Partial<RepresentativeModel> {
    const model: Partial<RepresentativeModel> = {};

    if (partial.getRepresentativeName) {
      model.representativeName = partial.getRepresentativeName() ?? undefined;
    }

    if (partial.getRepresentativeIdType) {
      model.representativeIdType =
        partial.getRepresentativeIdType() ?? undefined;
    }

    if (partial.getRepresentativeId) {
      model.representativeId = partial.getRepresentativeId() ?? undefined;
    }

    return model;
  }

  /** UPDATE REPRESENTATIVE */
  async update(
    id: string,
    representative: Partial<Representative>,
    queryRunner?: QueryRunner
  ): Promise<Representative | null> {
    const updateData = this.partialToPersistence(representative);
    const repo =
      queryRunner?.manager.getRepository(RepresentativeModel) ?? this.repo;
    await repo.update(id, updateData);
    const updated = await this.repo.findOne({ where: { id } });
    return updated ? this.toDomain(updated) : null;
  }

  /** DELETE REPRESENTATIVE */
  async delete(id: string, queryRunner?: QueryRunner): Promise<void> {
    const repo =
      queryRunner?.manager.getRepository(RepresentativeModel) ?? this.repo;
    await repo.delete(id);
  }

  /** MAP DOMAIN TO PERSISTENCE */
  private toPersistence(entity: Representative): RepresentativeModel {
    const model = new RepresentativeModel();
    model.representativeName = entity.getRepresentativeName();
    model.representativeIdType = entity.getRepresentativeIdType();
    model.representativeId = entity.getRepresentativeId();
    model.tenant = { id: entity.getTenantId() } as any;
    return model;
  }

  /** MAP PERSISTENCE TO DOMAIN */
  private toDomain(model: RepresentativeModel): Representative {
    return new Representative({
      id: model.id,
      representativeName: model.representativeName,
      representativeIdType: model.representativeIdType,
      representativeId: model.representativeId,
      tenantId: model.tenant.id,
    });
  }
}
