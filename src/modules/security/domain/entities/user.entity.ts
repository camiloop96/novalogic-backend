import { Credentials } from "./credential.entity";

export class User {
  private _id: string | null;
  private _fullName: string;
  private _email: string;
  private _phoneNumber: string | null;
  private _role: string;
  private _tenantId: string;
  private _credentials: Credentials | null;

  constructor(params: {
    id?: string | null;
    fullName: string;
    email: string;
    phoneNumber?: string | null;
    role: string;
    tenantId: string;
    credentials: Credentials | null;
  }) {
    this._id = params.id ?? null;
    this._fullName = params.fullName;
    this._email = params.email;
    this._phoneNumber = params.phoneNumber ?? null;
    this._role = params.role;
    this._tenantId = params.tenantId;
    this._credentials = params.credentials ?? null;
  }

  // Getters
  getId(): string | null {
    return this._id;
  }

  getFullName(): string {
    return this._fullName;
  }

  getEmail(): string {
    return this._email;
  }

  getPhoneNumber(): string | null {
    return this._phoneNumber;
  }

  getRole(): string {
    return this._role;
  }

  getTenantId(): string {
    return this._tenantId;
  }

  getCredentials(): Credentials {
    return this._credentials!;
  }

  getCredentialsId(): string | null {
    return this._credentials ? this._credentials.getId() : null;
  }

  // Setters
  setId(value: string | null): void {
    this._id = value;
  }

  setFullName(value: string): void {
    this._fullName = value;
  }

  setEmail(value: string): void {
    this._email = value;
  }

  setPhoneNumber(value: string | null): void {
    this._phoneNumber = value;
  }

  setRole(value: string): void {
    this._role = value;
  }

  setTenantId(value: string): void {
    this._tenantId = value;
  }

  setCredentials(value: Credentials): void {
    this._credentials = value;
  }
}
