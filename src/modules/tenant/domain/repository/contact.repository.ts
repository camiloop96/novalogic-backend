import { QueryRunner } from "typeorm";
import { Contact } from "../entities/tenant-contact.entity";

export abstract class ContactRepository {
  abstract create(
    contact: Contact,
    queryRunner?: QueryRunner
  ): Promise<Contact>;
  abstract findById(id: string): Promise<Contact | null>;
  abstract findByEmail(email: string): Promise<Contact | null>;
  abstract findAll(): Promise<Contact[]>;
  abstract update(
    id: string,
    contact: Partial<Contact>,
    queryRunner?: QueryRunner
  ): Promise<Contact | null>;
  abstract delete(id: string, queryRunner?: QueryRunner): Promise<void>;
}
