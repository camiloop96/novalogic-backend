import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { OrderShippingModel } from "./order-shipping.model";
import { ShippingProvider } from "../../../domain/entities/shipping-providers.enum";

@Entity("shipping_methods")
export class ShippingMethodModel {
  /** shipping_methods.id */
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  /** shipping_methods.name */
  @Column()
  name!: string;

  /** shipping_methods.estimated_days */
  @Column({ nullable: true, name: "estimated_days", type: "int" })
  estimatedDays?: number;

  /** shipping_methods.price */
  @Column("decimal", { nullable: true, precision: 10, scale: 2 })
  price?: number;

  /** shipping_methods.provider */
  @Column({ type: "enum", enum: ShippingProvider, nullable: true })
  provider?: ShippingProvider;

  /** shipping_methods.orderShipping */
  @OneToMany(() => OrderShippingModel, (shipping) => shipping.shippingMethod)
  orderShipping!: OrderShippingModel[];
}
