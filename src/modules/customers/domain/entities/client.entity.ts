import { Tenant } from "@tenant/domain/entities/tenant.entity";

export class Client {
  private _id: string;
  private _fullName: string;
  private _email?: string;
  private _phoneNumber?: string;
  private _documentType?: string;
  private _documentNumber?: string;
  private _note?: string;
  private _tenant: Tenant;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(params: {
    id: string;
    fullName: string;
    email?: string;
    phoneNumber?: string;
    documentType?: string;
    documentNumber?: string;
    note?: string;
    tenant: Tenant;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this._id = params.id;
    this._fullName = params.fullName;
    this._email = params.email ?? undefined;
    this._phoneNumber = params.phoneNumber ?? undefined;
    this._documentType = params.documentType ?? undefined;
    this._documentNumber = params.documentNumber ?? undefined;
    this._note = params.note ?? undefined;
    this._tenant = params.tenant;
    this._createdAt = params.createdAt;
    this._updatedAt = params.updatedAt;
  }

  // Getters
  getId(): string {
    return this._id;
  }

  getFullName(): string {
    return this._fullName;
  }

  getEmail(): string | undefined {
    return this._email;
  }

  getPhoneNumber(): string | undefined {
    return this._phoneNumber;
  }

  getDocumentType(): string | undefined {
    return this._documentType;
  }

  getDocumentNumber(): string | undefined {
    return this._documentNumber;
  }

  getNote(): string | undefined {
    return this._note;
  }

  getTenant(): Tenant {
    return this._tenant;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }

  getUpdatedAt(): Date {
    return this._updatedAt;
  }

  // Setters
  setFullName(value: string) {
    this._fullName = value;
  }

  setEmail(value?: string) {
    this._email = value;
  }

  setPhoneNumber(value?: string) {
    this._phoneNumber = value;
  }

  setDocumentType(value?: string) {
    this._documentType = value;
  }

  setDocumentNumber(value?: string) {
    this._documentNumber = value;
  }

  setNote(value?: string) {
    this._note = value;
  }

  setTenant(tenant: Tenant) {
    this._tenant = tenant;
  }

  setCreatedAt(value: Date) {
    this._createdAt = value;
  }

  setUpdatedAt(value: Date) {
    this._updatedAt = value;
  }
}
