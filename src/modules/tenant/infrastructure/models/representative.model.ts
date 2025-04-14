import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TenantModel } from "./tenant.model";

@Entity("representatives")
export class RepresentativeModel {
  /** representatives.id */
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  /** representatives.representative_name */
  @Column({ name: "representative_name" })
  representativeName!: string;

  /** representatives.representative_id_type */
  @Column({ name: "representative_id_type" })
  representativeIdType!: string;

  /** representatives.representative_id */
  @Column({ name: "representative_id", unique: true })
  representativeId!: string;

  /** representatives.tenant_id -> tenants.id */
  @OneToOne(() => TenantModel, (tenant) => tenant.representative)
  @JoinColumn({ name: "tenant_id" })
  tenant!: TenantModel;
}
