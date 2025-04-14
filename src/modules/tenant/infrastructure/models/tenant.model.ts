import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ContactModel } from "./contact.model";
import { RepresentativeModel } from "./representative.model";
import { StoreModel } from "@stores/infrastructure/persistence/models/store.model";
import { UserModel } from "@security/infrastructure/persistence/models/user.model";

@Entity("tenants")
export class TenantModel {
  /** tenants.id */
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  /** tenants.tenant_name */
  @Column({ name: "tenant_name" })
  tenantName!: string;

  /** tenants.tenant_id */
  @Column({ name: "tenant_id", unique: true })
  tenantId!: string;

  /** tenants.tenant_id_type */
  @Column({ name: "tenant_id_type" })
  tenantIdType!: string;

  /** tenants.person_type */
  @Column({ name: "person_type" })
  personType!: string;

  /** tenants.subscription_plan */
  @Column({ name: "subscription_plan" })
  subscriptionPlan!: string;

  /** tenants.currency */
  @Column({ name: "currency" })
  currency!: string;

  /** tenants.status */
  @Column({ type: "boolean", default: true })
  status!: boolean;

  /** tenants.id -> contacts.tenant_id */
  @OneToOne(() => ContactModel, (contact) => contact.tenant, {
    cascade: true,
    eager: true,
  })
  contact!: ContactModel;

  /** tenants.id -> representatives.tenant_id */
  @OneToOne(() => RepresentativeModel, (rep) => rep.tenant, { cascade: true })
  representative!: RepresentativeModel;

  /** tenants.id -> users.tenant_id */
  @OneToMany(() => UserModel, (user) => user.tenant, { cascade: true })
  users!: UserModel[];

  /** tenants.id -> stores.tenant_id */
  @OneToMany(() => StoreModel, (store) => store.tenant)
  stores!: StoreModel[];

  /** tenants.created_at */
  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: Date;
}
