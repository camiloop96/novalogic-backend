import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { OrderModel } from "./order.model";
import { ProductModel } from "@inventory/infrastructure/persistence/models/product.model";
import { TenantModel } from "@tenant/infrastructure/models/tenant.model";

@Entity("order_items")
export class OrderItemModel {
  /** order_items.id */
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  /** order_items.order_id */
  @Column({ name: "order_id" })
  orderId!: string;

  /** order_items.product_id */
  @Column({ name: "product_id" })
  productId!: string;

  /** order_items.quantity */
  @Column("int")
  quantity!: number;

  /** order_items.unit_price */
  @Column("decimal", { name: "unit_price", precision: 10, scale: 2 })
  unitPrice!: number;

  /** order_items.subtotal */
  @Column("decimal", { precision: 10, scale: 2 })
  subtotal!: number;

  /** order_items.tenant_id */
  @Column({ name: "tenant_id" })
  tenantId!: string;

  /** Relation: many order items belong to one order */
  @ManyToOne(() => OrderModel, (order) => order.orderItems)
  @JoinColumn({ name: "order_id" })
  order!: OrderModel;

  /** Relation: many order items belong to one product */
  @ManyToOne(() => ProductModel, (product) => product.orderItems)
  @JoinColumn({ name: "product_id" })
  product!: ProductModel;

  /** Relation: many order items belong to one tenant */
  @ManyToOne(() => TenantModel)
  @JoinColumn({ name: "tenant_id" })
  tenant!: TenantModel;
}
