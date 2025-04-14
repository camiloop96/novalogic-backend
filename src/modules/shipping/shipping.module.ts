import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderShippingModel } from "./infrastructure/persistence/models/order-shipping.model";
import { ShippingMethodModel } from "./infrastructure/persistence/models/shipping-method.model";

@Module({
    imports: [TypeOrmModule.forFeature([OrderShippingModel, ShippingMethodModel])],
    providers: [],
    controllers: [],
  })
  
export class ShippingModule {}
  