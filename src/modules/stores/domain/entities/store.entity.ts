import { Tenant } from "@tenant/domain/entities/tenant.entity";

export class Store {
  private _id: string;
  private _name: string;
  private _slug: string;
  private _logo?: string;
  private _isActive: boolean;
  private _tenant: Tenant;

  constructor(params: {
    id: string;
    name: string;
    slug: string;
    logo?: string;
    isActive?: boolean;
    tenant: Tenant;
  }) {
    this._id = params.id;
    this._name = params.name;
    this._slug = params.slug;
    this._logo = params.logo ?? undefined;
    this._isActive = params.isActive ?? true;
    this._tenant = params.tenant;
  }

  // Getters
  getId(): string {
    return this._id;
  }

  getName(): string {
    return this._name;
  }

  getSlug(): string {
    return this._slug;
  }

  getLogo(): string | undefined {
    return this._logo;
  }

  getIsActive(): boolean {
    return this._isActive;
  }

  getTenant(): Tenant {
    return this._tenant;
  }

  // Setters
  setName(value: string) {
    this._name = value;
  }

  setSlug(value: string) {
    this._slug = value;
  }

  setLogo(value?: string) {
    this._logo = value;
  }

  setIsActive(value: boolean) {
    this._isActive = value;
  }

  setTenant(tenant: Tenant) {
    this._tenant = tenant;
  }
}
