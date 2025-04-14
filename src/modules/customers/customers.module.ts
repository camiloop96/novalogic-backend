import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientModel } from "./infrastructure/persistence/models/client.model";
import { ClientAddressModel } from "./infrastructure/persistence/models/client-address.model";

@Module({
  imports: [TypeOrmModule.forFeature([ClientModel, ClientAddressModel])],
  providers: [],
  controllers: [],
})
export class CustomersModule {}
