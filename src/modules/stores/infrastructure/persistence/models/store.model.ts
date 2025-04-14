import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";

import { TenantModel } from "modules/tenant/infrastructure/models/tenant.model";
import { OrderModel } from "modules/orders/infrastructure/persistence/models/order.model";

@Entity("stores")
export class StoreModel {
  /** stores.id */
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  /** stores.name */
  @Column()
  name!: string;

  /** stores.slug */
  @Column({ unique: true })
  slug!: string;

  /** stores.logo */
  @Column({ nullable: true })
  logo?: string;

  /** stores.is_active */
  @Column({ name: "is_active", default: true })
  isActive!: boolean;

  /** stores.tenant_id -> tenants.id */
  @ManyToOne(() => TenantModel, (tenant) => tenant.stores)
  @JoinColumn({ name: "tenant_id" })
  tenant!: TenantModel;

  /** Relation: one store has many orders */
  @OneToMany(() => OrderModel, (order) => order.store)
  orders!: OrderModel[];
}
