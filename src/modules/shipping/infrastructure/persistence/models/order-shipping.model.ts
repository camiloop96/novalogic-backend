import { ClientAddressModel } from "modules/customers/infrastructure/persistence/models/client-address.model";
import { OrderModel } from "modules/orders/infrastructure/persistence/models/order.model";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ShippingMethodModel } from "./shipping-method.model";
import { TenantModel } from "modules/tenant/infrastructure/models/tenant.model";

@Entity("order_shipping")
export class OrderShippingModel {
  /** order_shipping.id */
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  /** order_shipping.order_id */
  @Column({ name: "order_id" })
  orderId!: string;

  /** order_shipping.address_id */
  @Column({ name: "address_id" })
  addressId!: string;

  /** order_shipping.shipping_method_id */
  @Column({ name: "shipping_method_id" })
  shippingMethodId!: string;

  /** order_shipping.tenant_id */
  @Column({ name: "tenant_id" })
  tenantId!: string;

  /** order_shipping.order */
  @ManyToOne(() => OrderModel, (order) => order.orderShipping)
  @JoinColumn({ name: "order_id" })
  order!: OrderModel;

  /** order_shipping.address */
  @ManyToOne(() => ClientAddressModel)
  @JoinColumn({ name: "address_id" })
  address!: ClientAddressModel;

  /** order_shipping.shipping_method */
  @ManyToOne(() => ShippingMethodModel, (sm) => sm.orderShipping)
  @JoinColumn({ name: "shipping_method_id" })
  shippingMethod!: ShippingMethodModel;

  /** order_shipping.tenant */
  @ManyToOne(() => TenantModel)
  @JoinColumn({ name: "tenant_id" })
  tenant!: TenantModel;
}
