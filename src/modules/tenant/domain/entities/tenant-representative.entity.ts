export class Representative {
  private _id: string | null;
  private _representativeName: string;
  private _representativeIdType: string;
  private _representativeId: string;
  private _tenantId: string | null;

  constructor(params: {
    id?: string | null;
    representativeName: string;
    representativeIdType: string;
    representativeId: string;
    tenantId: string;
  }) {
    this._id = params.id ?? null;
    this._representativeName = params.representativeName;
    this._representativeIdType = params.representativeIdType;
    this._representativeId = params.representativeId;
    this._tenantId = params.tenantId;
  }

  // Getters
  getId(): string | null {
    return this._id;
  }

  getRepresentativeName(): string {
    return this._representativeName;
  }

  getRepresentativeIdType(): string {
    return this._representativeIdType;
  }

  getRepresentativeId(): string {
    return this._representativeId;
  }

  getTenantId(): string {
    return this._tenantId!;
  }

  // Setters
  setRepresentativeName(value: string) {
    this._representativeName = value;
  }

  setRepresentativeIdType(value: string) {
    this._representativeIdType = value;
  }

  setRepresentativeId(value: string) {
    this._representativeId = value;
  }

  setTenantId(value: string) {
    this._tenantId = value;
  }
}
