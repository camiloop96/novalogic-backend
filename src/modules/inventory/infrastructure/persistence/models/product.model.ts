import { TenantModel } from "modules/tenant/infrastructure/models/tenant.model";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { CategoryModel } from "./category.model";
import { InventoryModel } from "./inventory.model";
import { OrderItemModel } from "@orders/infrastructure/persistence/models/order-item.model";

@Entity("products")
export class ProductModel {
  /** products.id */
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  /** products.name */
  @Column()
  name!: string;

  /** products.sku */
  @Column({ unique: true })
  sku!: string;

  /** products.description */
  @Column("text", { nullable: true })
  description?: string;

  /** products.short_description */
  @Column({ nullable: true, name: "short_description" })
  shortDescription?: string;

  /** products.category_id */
  @Column({ name: "category_id", nullable: true })
  categoryId?: string;

  /** products.main_image */
  @Column({ name: "main_image", nullable: true })
  mainImage?: string;

  /** products.price */
  @Column("decimal", { precision: 10, scale: 2 })
  price!: number;

  /** products.status */
  @Column({ default: true })
  status!: boolean;

  /** products.created_at */
  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  /** products.updated_at */
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  /** Relation: many products belong to one tenant */
  @ManyToOne(() => TenantModel)
  @JoinColumn({ name: "tenant_id" })
  tenant!: TenantModel;

  /** Relation: many products belong to one category */
  @ManyToOne(() => CategoryModel, (category) => category.products, {
    nullable: true,
  })
  @JoinColumn({ name: "category_id" })
  category?: CategoryModel;

  /** Relation: one product has many inventory records */
  @OneToMany(() => InventoryModel, (inventory) => inventory.product)
  inventories!: InventoryModel[];

  /** Relation: one product has many order items */
  @OneToMany(() => OrderItemModel, (orderItem) => orderItem.product)
  orderItems!: OrderItemModel[];
}
