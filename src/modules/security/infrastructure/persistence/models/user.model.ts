import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CredentialsModel } from "./credential.model";
import { TenantModel } from "modules/tenant/infrastructure/models/tenant.model";

@Entity("users")
export class UserModel {
  /** users.id */
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id!: string;

  /** users.full_name */
  @Column({ name: "full_name" })
  fullName!: string;

  /** users.email */
  @Column({ name: "email", unique: true })
  email!: string;

  /** users.phone_number */
  @Column({ name: "phone_number", nullable: true })
  phoneNumber?: string;

  /** users.role */
  @Column({ name: "role" })
  role!: string;

  /** users.tenant_id -> tenants.id */
  @ManyToOne(() => TenantModel, (tenant) => tenant.users, { nullable: true })
  @JoinColumn({ name: "tenant_id" })
  tenant?: TenantModel;

  /** users.credentials_id -> credentials.id */
  @OneToOne(() => CredentialsModel, (credentials) => credentials.user, {
    eager: false,
  })
  @JoinColumn({ name: "credentials_id" })
  credentials!: CredentialsModel;
}
