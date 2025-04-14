import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductModel } from "./infrastructure/persistence/models/product.model";
import { CategoryModel } from "./infrastructure/persistence/models/category.model";
import { InventoryAllocationModel } from "./infrastructure/persistence/models/inventory-allocation.model";
import { InventoryModel } from "./infrastructure/persistence/models/inventory.model";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductModel,
      CategoryModel,
      InventoryAllocationModel,
      InventoryModel,
    ]),
  ],
  providers: [],
  controllers: [],
})
export class InventoryModule {}
