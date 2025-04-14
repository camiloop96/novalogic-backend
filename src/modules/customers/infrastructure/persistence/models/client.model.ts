import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { TenantModel } from "modules/tenant/infrastructure/models/tenant.model";
import { ClientAddressModel } from "./client-address.model";
import { OrderModel } from "modules/orders/infrastructure/persistence/models/order.model";

@Entity("clients")
export class ClientModel {
  /** clients.id */
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  /** clients.full_name */
  @Column({ name: "full_name" })
  fullName!: string;

  /** clients.email */
  @Column({ nullable: true })
  email?: string;

  /** clients.phone_number */
  @Column({ name: "phone_number", nullable: true })
  phoneNumber?: string;

  /** clients.document_type */
  @Column({ name: "document_type", nullable: true })
  documentType?: string;

  /** clients.document_number */
  @Column({ name: "document_number", nullable: true })
  documentNumber?: string;

  /** clients.note */
  @Column({ nullable: true, type: "text" })
  note?: string;

  /** clients.tenant_id -> tenants.id */
  @ManyToOne(() => TenantModel)
  @JoinColumn({ name: "tenant_id" })
  tenant!: TenantModel;

  /** Relation: one client has many addresses */
  @OneToMany(() => ClientAddressModel, (address) => address.client)
  addresses!: ClientAddressModel[];

  /** Relation: one client has many orders */
  @OneToMany(() => OrderModel, (order) => order.client)
  orders!: OrderModel[];

  /** clients.created_at */
  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  /** clients.updated_at */
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
