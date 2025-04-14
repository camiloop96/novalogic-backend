import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  Index,
} from "typeorm";

import { OrderItemModel } from "./order-item.model";
import { OrderStatus } from "../../../domain/entities/order-status.enum";
import { ClientModel } from "@customers/infrastructure/persistence/models/client.model";
import { StoreModel } from "@stores/infrastructure/persistence/models/store.model";
import { TenantModel } from "@tenant/infrastructure/models/tenant.model";
import { OrderPaymentModel } from "@payments/infrastructure/persistence/models/order-payment.model";
import { OrderShippingModel } from "@shipping/infrastructure/persistence/models/order-shipping.model";

@Entity("orders")
export class OrderModel {
  /** orders.id */
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  /** orders.status - pending, paid, shipped, delivered, cancelled */
  @Column({ type: "enum", enum: OrderStatus })
  status!: OrderStatus;

  /** orders.total */
  @Column("decimal", { precision: 10, scale: 2 })
  total!: number;

  /** orders.client_id (foreign key) */
  @Index()
  @Column({ name: "client_id" })
  clientId!: string;

  /** orders.store_id (foreign key) */
  @Index()
  @Column({ name: "store_id" })
  storeId!: string;

  /** orders.tenant_id (foreign key) */
  @Index()
  @Column({ name: "tenant_id" })
  tenantId!: string;

  /** orders.created_at */
  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  /** Relation: many orders belong to one client */
  @ManyToOne(() => ClientModel, (client) => client.orders)
  @JoinColumn({ name: "client_id" })
  client!: ClientModel;

  /** Relation: many orders belong to one store */
  @ManyToOne(() => StoreModel, (store) => store.orders)
  @JoinColumn({ name: "store_id" })
  store!: StoreModel;

  /** Relation: many orders belong to one tenant */
  @ManyToOne(() => TenantModel)
  @JoinColumn({ name: "tenant_id" })
  tenant!: TenantModel;

  /** Relation: one order has many order items */
  @OneToMany(() => OrderItemModel, (orderItem) => orderItem.order)
  orderItems!: OrderItemModel[];

  /** Relation: one order has many payments */
  @OneToMany(() => OrderPaymentModel, (payment) => payment.order)
  payments!: OrderPaymentModel[];

  /** Relation: one order has many shipping records */
  @OneToMany(() => OrderShippingModel, (shipping) => shipping.order)
  orderShipping!: OrderShippingModel[];

  /** orders.updated_at */
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  /** orders.deleted_at (soft delete support) */
  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt?: Date;
}
