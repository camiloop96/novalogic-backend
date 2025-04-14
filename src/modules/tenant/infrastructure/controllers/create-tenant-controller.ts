import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateTenantDto } from "modules/tenant/application/dto/in/create-tenant.dto";
import { TenantCreationService } from "modules/tenant/domain/services/create-tenant.service";

import { Tenant } from "modules/tenant/domain/entities/tenant.entity";

@ApiTags("Tenant")
@Controller("api/tenant")
export class TenantController {
  constructor(private readonly tenantCreationService: TenantCreationService) {}

  /** 🏢 Crear un nuevo Tenant */
  @Post("create")
  @ApiBody({ type: CreateTenantDto })
  @ApiResponse({
    status: 201,
    description: "Tenant creado exitosamente",
    type: Tenant,
  })
  @ApiResponse({
    status: 409,
    description:
      "Conflicto: Ya existe un Tenant o Representative con el mismo número de identificación",
  })
  async createTenant(
    @Body() createTenantDto: CreateTenantDto
  ): Promise<Tenant> {
    return await this.tenantCreationService.createTenant(createTenantDto);
  }
}
