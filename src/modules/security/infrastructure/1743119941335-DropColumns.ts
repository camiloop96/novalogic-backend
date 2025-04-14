import { MigrationInterface, QueryRunner } from "typeorm";

export class DropColumns1743119943371 implements MigrationInterface {
  name = "DropColumns1743119943371";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users" 
      DROP COLUMN IF EXISTS "fullName",
      DROP COLUMN IF EXISTS "phoneNumber",
      DROP COLUMN IF EXISTS "tenantId"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users" 
      ADD COLUMN IF NOT EXISTS "fullName" VARCHAR NOT NULL,
      ADD COLUMN IF NOT EXISTS "phoneNumber" VARCHAR,
      ADD COLUMN IF NOT EXISTS "tenantId" VARCHAR NOT NULL
    `);
  }
}
