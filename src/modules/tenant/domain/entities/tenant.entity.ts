export class Tenant {
  private _id: string | null;
  private _tenantName: string;
  private _tenantIdType: string;
  private _tenantId: string;
  private _personType: "natural" | "juridica";
  private _subscriptionPlan: string;
  private _currency: string;

  constructor(params: {
    id?: string | null;
    tenantName: string;
    tenantIdType: string;
    tenantId: string;
    personType: "natural" | "juridica";
    subscriptionPlan: string;
    currency: string;
  }) {
    this._id = params.id ?? null;
    this._tenantName = params.tenantName;
    this._tenantIdType = params.tenantIdType;
    this._tenantId = params.tenantId;
    this._personType = params.personType;
    this._subscriptionPlan = params.subscriptionPlan;
    this._currency = params.currency;
  }

  // Getters
  getId(): string | null {
    return this._id;
  }

  getTenantName(): string {
    return this._tenantName;
  }

  getTenantIdType(): string {
    return this._tenantIdType;
  }

  getTenantId(): string {
    return this._tenantId;
  }

  getPersonType(): "natural" | "juridica" {
    return this._personType;
  }

  getSubscriptionPlan(): string {
    return this._subscriptionPlan;
  }

  getCurrency(): string {
    return this._currency;
  }

  // Setters
  setTenantName(value: string) {
    this._tenantName = value;
  }

  setTenantIdType(value: string) {
    this._tenantIdType = value;
  }

  setTenantId(value: string) {
    this._tenantId = value;
  }

  setPersonType(value: "natural" | "juridica") {
    this._personType = value;
  }

  setSubscriptionPlan(value: string) {
    this._subscriptionPlan = value;
  }

  setCurrency(value: string) {
    this._currency = value;
  }
}
