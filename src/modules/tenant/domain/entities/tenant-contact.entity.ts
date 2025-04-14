export class Contact {
  private _id: string | null;
  private _email: string;
  private _website: string | null;
  private _department: string;
  private _city: string;
  private _address: string;
  private _phoneNumber: string | null;

  constructor(params: {
    id?: string | null;
    email: string;
    website?: string | null;
    department: string;
    city: string;
    address: string;
    phoneNumber?: string | null;
  }) {
    this._id = params.id ?? null;
    this._email = params.email;
    this._website = params.website ?? null;
    this._department = params.department;
    this._city = params.city;
    this._address = params.address;
    this._phoneNumber = params.phoneNumber ?? null;
  }

  // Getters
  getId(): string | null {
    return this._id;
  }

  getEmail(): string {
    return this._email;
  }

  getWebsite(): string | null {
    return this._website;
  }

  getDepartment(): string {
    return this._department;
  }

  getCity(): string {
    return this._city;
  }

  getAddress(): string {
    return this._address;
  }

  getPhoneNumber(): string | null {
    return this._phoneNumber;
  }

  // Setters
  setEmail(value: string) {
    this._email = value;
  }

  setWebsite(value: string | null) {
    this._website = value;
  }

  setDepartment(value: string) {
    this._department = value;
  }

  setCity(value: string) {
    this._city = value;
  }

  setAddress(value: string) {
    this._address = value;
  }

  setPhoneNumber(value: string | null) {
    this._phoneNumber = value;
  }
}
