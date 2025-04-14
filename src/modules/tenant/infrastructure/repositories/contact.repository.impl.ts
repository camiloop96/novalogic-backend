import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Contact } from "modules/tenant/domain/entities/tenant-contact.entity";
import { ContactRepository } from "modules/tenant/domain/repository/contact.repository";
import { QueryRunner, Repository } from "typeorm";
import { ContactModel } from "../models/contact.model";

@Injectable()
export class ContactRepositoryImpl implements ContactRepository {
  constructor(
    @InjectRepository(ContactModel)
    private readonly repo: Repository<ContactModel>
  ) {}

  private partialToPersistence(
    partial: Partial<Contact>
  ): Partial<ContactModel> {
    const model: Partial<ContactModel> = {};
    if (partial.getEmail) model.email = partial.getEmail() ?? undefined;
    if (partial.getWebsite) model.website = partial.getWebsite() ?? undefined;
    if (partial.getDepartment)
      model.department = partial.getDepartment() ?? undefined;
    if (partial.getCity) model.city = partial.getCity() ?? undefined;
    if (partial.getAddress) model.address = partial.getAddress() ?? undefined;
    return model;
  }

  /** CREATE CONTACT */
  async create(contact: Contact, queryRunner?: QueryRunner): Promise<Contact> {
    const contactModel = this.toPersistence(contact);
    const repo = queryRunner?.manager.getRepository(ContactModel) ?? this.repo;
    const savedModel = await repo.save(contactModel);
    return this.toDomain(savedModel);
  }

  /** FIND CONTACT BY ID */
  async findById(id: string): Promise<Contact | null> {
    const found = await this.repo.findOne({ where: { id } });
    return found ? this.toDomain(found) : null;
  }

  /** FIND CONTACT BY EMAIL */
  async findByEmail(email: string): Promise<Contact | null> {
    const found = await this.repo.findOne({ where: { email } });
    return found ? this.toDomain(found) : null;
  }

  /** FIND ALL CONTACTS */
  async findAll(): Promise<Contact[]> {
    const found = await this.repo.find();
    return found.map((model) => this.toDomain(model));
  }

  /** UPDATE CONTACT */
  async update(
    id: string,
    contact: Partial<Contact>,
    queryRunner?: QueryRunner
  ): Promise<Contact | null> {
    const partialModel = this.partialToPersistence(contact);
    const repo = queryRunner?.manager.getRepository(ContactModel) ?? this.repo;
    await repo.update(id, partialModel);
    const updated = await this.repo.findOne({ where: { id } });
    return updated ? this.toDomain(updated) : null;
  }

  /** DELETE CONTACT */
  async delete(id: string, queryRunner?: QueryRunner): Promise<void> {
    const repo = queryRunner?.manager.getRepository(ContactModel) ?? this.repo;
    await repo.delete(id);
  }

  /** MAP DOMAIN TO PERSISTENCE */
  private toPersistence(entity: Contact): ContactModel {
    const model = new ContactModel();
    model.email = entity.getEmail();
    model.website = entity.getWebsite() ?? undefined;
    model.department = entity.getDepartment();
    model.city = entity.getCity();
    model.address = entity.getAddress();
    return model;
  }

  /** MAP PERSISTENCE TO DOMAIN */
  private toDomain(model: ContactModel): Contact {
    return new Contact({
      id: model.id,
      email: model.email,
      website: model.website,
      department: model.department,
      city: model.city,
      address: model.address,
    });
  }
}
