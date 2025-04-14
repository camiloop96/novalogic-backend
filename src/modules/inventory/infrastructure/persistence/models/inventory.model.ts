// src/modules/inventory/entities/inventory.model.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { ProductModel } from "./product.model";
import { TenantModel } from "modules/tenant/infrastructure/models/tenant.model";
import { InventoryAllocationModel } from "./inventory-allocation.model";

@Entity("inventory")
export class InventoryModel {
  /** inventory.id */
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  /** inventory.product_id */
  @Column({ name: "product_id" })
  productId!: string;

  /** inventory.quantity */
  @Column("int")
  quantity!: number;

  /** inventory.warehouse_id */
  @Column({ name: "warehouse_id", nullable: true })
  warehouseId?: string;

  /** Relation: many inventory records belong to one product */
  @ManyToOne(() => ProductModel, (product) => product.inventories)
  @JoinColumn({ name: "product_id" })
  product!: ProductModel;

  /** Relation: many inventory records belong to one tenant */
  @ManyToOne(() => TenantModel)
  @JoinColumn({ name: "tenant_id" })
  tenant!: TenantModel;

  /** Relation: one inventory record has many allocations */
  @OneToMany(
    () => InventoryAllocationModel,
    (allocation) => allocation.inventory
  )
  allocations!: InventoryAllocationModel[];
}
