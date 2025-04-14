import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { OrderPaymentModel } from "./order-payment.model";

@Entity("payment_methods")
export class PaymentMethodModel {
  /** payment_methods.id */
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  /** payment_methods.name */
  @Column({ name: "name" })
  name!: string;

  /** payment_methods.type */
  @Column({ name: "type" })
  type!: string;

  /** payment_methods.order_payments */
  @OneToMany(() => OrderPaymentModel, (payment) => payment.paymentMethod)
  orderPayments!: OrderPaymentModel[];
}
