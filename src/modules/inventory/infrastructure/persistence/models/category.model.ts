import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";

import { ProductModel } from "./product.model";
import { TenantModel } from "@tenant/infrastructure/models/tenant.model";

@Entity("categories")
export class CategoryModel {
  /** categories.id */
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  /** categories.name */
  @Column()
  name!: string;

  /** categories.slug */
  @Column({ unique: true })
  slug!: string;

  /** categories.description */
  @Column("text", { nullable: true })
  description?: string;

  /** Relation: many categories belong to one tenant */
  @ManyToOne(() => TenantModel)
  @JoinColumn({ name: "tenant_id" })
  tenant!: TenantModel;

  /** Relation: one category has many products */
  @OneToMany(() => ProductModel, (product) => product.category)
  products!: ProductModel[];
}
