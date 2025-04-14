import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { InventoryModel } from "./inventory.model";
import { TenantModel } from "@tenant/infrastructure/models/tenant.model";

@Entity("inventory_allocations")
export class InventoryAllocationModel {
  /** inventory_allocations.id */
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  /** inventory_allocations.collection */
  @Column({ name: "collection" })
  collection!: string;

  /** inventory_allocations.percentage */
  @Column("float", { name: "percentage" })
  percentage!: number;

  /** inventory_allocations.allocated_stock */
  @Column({ name: "allocated_stock", nullable: true })
  allocatedStock?: number;

  /** Relation: many allocations belong to one inventory record */
  @ManyToOne(() => InventoryModel, (inventory) => inventory.allocations)
  @JoinColumn({ name: "inventory_id" })
  inventory!: InventoryModel;

  /** Relation: many allocations belong to one tenant */
  @ManyToOne(() => TenantModel)
  @JoinColumn({ name: "tenant_id" })
  tenant!: TenantModel;
}
