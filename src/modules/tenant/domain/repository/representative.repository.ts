import { QueryRunner } from "typeorm";
import { Representative } from "../entities/tenant-representative.entity";

export abstract class RepresentativeRepository {
  abstract create(
    representative: Representative,
    queryRunner?: QueryRunner
  ): Promise<Representative>;
  abstract findById(id: string): Promise<Representative | null>;
  abstract findByRepresentativeId(
    representativeId: string
  ): Promise<Representative | null>;
  abstract findAll(): Promise<Representative[]>;
  abstract update(
    id: string,
    representative: Partial<Representative>,
    queryRunner?: QueryRunner
  ): Promise<Representative | null>;
  abstract delete(id: string, queryRunner?: QueryRunner): Promise<void>;
}
