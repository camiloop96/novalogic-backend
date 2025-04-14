import { HealthController } from "@common/controllers/health.controller";
import { DatabaseHealthService } from "@common/services/db-health.service";
import { typeOrmConfig } from "@config/typeorm.config";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SecurityModule } from "modules/security/security.module";
import { TenantModule } from "modules/tenant/tenant.module";
import { AppController } from "app.controller";
import { CustomersModule } from "@customers/customers.module";
import { OrdersModule } from "@orders/orders.module";
import { PaymentModule } from "@payments/payments.model";
import { ShippingModule } from "@shipping/shipping.module";
import { StoresModule } from "@stores/stores.module";
import { InventoryModule } from "@inventory/inventory.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    SecurityModule,
    TenantModule,
    CustomersModule,
    InventoryModule,
    OrdersModule,
    PaymentModule,
    ShippingModule,
    StoresModule,
  ],
  controllers: [HealthController, AppController],
  providers: [DatabaseHealthService],
})
export class AppModule {}
