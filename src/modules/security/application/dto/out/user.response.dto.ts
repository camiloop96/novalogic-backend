import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
  @ApiProperty({
    example: "123e4567-e89b-12d3-a456-426614174000",
    description: "ID único del usuario",
  })
  id!: string;

  @ApiProperty({
    example: "John Doe",
    description: "Nombre completo del usuario",
  })
  fullName!: string;

  @ApiProperty({
    example: "john.doe@example.com",
    description: "Correo electrónico del usuario",
  })
  email!: string;

  @ApiProperty({
    example: "+1234567890",
    description: "Número de teléfono del usuario",
    required: false,
  })
  phoneNumber?: string;

  @ApiProperty({ example: "TENANT_USER", description: "Rol del usuario" })
  role!: string;

  @ApiProperty({
    example: "123e4567-e89b-12d3-a456-426614174000",
    description: "ID del tenant al que pertenece",
  })
  tenantId!: string;
}
