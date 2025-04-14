import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderPaymentModel } from "./infrastructure/persistence/models/order-payment.model";
import { PaymentMethodModel } from "./infrastructure/persistence/models/payment-method.model";

@Module({
  imports: [TypeOrmModule.forFeature([OrderPaymentModel, PaymentMethodModel])],
  providers: [],
  controllers: [],
})
export class PaymentModule {}
