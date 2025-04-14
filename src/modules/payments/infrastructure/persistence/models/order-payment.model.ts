import { OrderModel } from "modules/orders/infrastructure/persistence/models/order.model";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { PaymentMethodModel } from "./payment-method.model";
import { TenantModel } from "modules/tenant/infrastructure/models/tenant.model";

@Entity("order_payments")
export class OrderPaymentModel {
  /** order_payments.id */
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  /** order_payments.order_id */
  @Column({ name: "order_id" })
  orderId!: string;

  /** order_payments.payment_method_id */
  @Column({ name: "payment_method_id" })
  paymentMethodId!: string;

  /** order_payments.amount */
  @Column("decimal")
  amount!: number;

  /** order_payments.paid_at */
  @CreateDateColumn({ name: "paid_at" })
  paidAt!: Date;

  /** order_payments.currency */
  @Column("varchar", { length: 3 })
  currency!: string;

  /** order_payments.tenant_id */
  @Column({ name: "tenant_id" })
  tenantId!: string;

  /** order_payments.order */
  @ManyToOne(() => OrderModel, (order) => order.payments)
  @JoinColumn({ name: "order_id" })
  order!: OrderModel;

  /** order_payments.payment_method */
  @ManyToOne(() => PaymentMethodModel, (pm) => pm.orderPayments)
  @JoinColumn({ name: "payment_method_id" })
  paymentMethod!: PaymentMethodModel;

  /** order_payments.status */
  @Column({ name: "status", type: "varchar", length: 20, default: "pending" })
  status!: string;

  /** order_payments.is_verified */
  @Column({ name: "is_verified", type: "boolean", default: false })
  isVerified!: boolean;

  /** order_payments.external_reference */
  @Column({ name: "external_reference", type: "varchar", nullable: true })
  externalReference?: string;

  /** order_payments.tenant */
  @ManyToOne(() => TenantModel)
  @JoinColumn({ name: "tenant_id" })
  tenant!: TenantModel;

  /** order_payments.created_at */
  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  /** order_payments.updated_at */
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
