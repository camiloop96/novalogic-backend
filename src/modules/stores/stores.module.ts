import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StoreModel } from "./infrastructure/persistence/models/store.model";

@Module({
    imports: [TypeOrmModule.forFeature([StoreModel])],
    providers: [],
    controllers: [],
  })
  
export class StoresModule {}
  