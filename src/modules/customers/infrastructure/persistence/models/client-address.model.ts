import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ClientModel } from "./client.model";
import { TenantModel } from "modules/tenant/infrastructure/models/tenant.model";

@Entity("client_addresses")
export class ClientAddressModel {
  /** client_addresses.id */
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  /** client_addresses.label */
  @Column({ name: "label", nullable: true })
  label?: string;

  /** client_addresses.department */
  @Column({ name: "department", nullable: true })
  department?: string;

  /** client_addresses.city */
  @Column({ name: "city", nullable: true })
  city?: string;

  /** client_addresses.address */
  @Column({ name: "address" })
  address!: string;

  /** client_addresses.is_default */
  @Column({ name: "is_default", default: false })
  isDefault!: boolean;

  /** Relation: many addresses belong to one client */
  @ManyToOne(() => ClientModel, (client) => client.addresses, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "client_id" })
  client!: ClientModel;

  /** Relation: many addresses belong to one tenant */
  @ManyToOne(() => TenantModel)
  @JoinColumn({ name: "tenant_id" })
  tenant!: TenantModel;

  /** client_addresses.created_at */
  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  /** client_addresses.updated_at */
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
