import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderModel } from "./infrastructure/persistence/models/order.model";
import { OrderItemModel } from "./infrastructure/persistence/models/order-item.model";
import { InventoryModule } from "@inventory/inventory.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderModel, OrderItemModel]),
    InventoryModule,
  ],
  providers: [],
  controllers: [],
})
export class OrdersModule {}
