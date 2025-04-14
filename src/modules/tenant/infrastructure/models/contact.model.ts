import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TenantModel } from "./tenant.model";

@Entity("contacts")
export class ContactModel {
  /** contacts.id */
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  /** contacts.email */
  @Column({ unique: true })
  email!: string;

  /** contacts.website */
  @Column({ nullable: true })
  website?: string;

  /** contacts.department */
  @Column()
  department!: string;

  /** contacts.city */
  @Column()
  city!: string;

  /** contacts.address */
  @Column()
  address!: string;

  /** contacts.tenant_id -> tenants.id */
  @OneToOne(() => TenantModel, (tenant) => tenant.contact)
  @JoinColumn({ name: "tenant_id" })
  tenant!: TenantModel;
}
