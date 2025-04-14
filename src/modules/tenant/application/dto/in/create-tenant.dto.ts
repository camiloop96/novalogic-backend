import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

class TenantInfo {
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  @IsString()
  tenantName!: string;

  @IsNotEmpty({ message: "El tipo de identificación es obligatorio" })
  @IsString()
  tenantIdType!: string;

  @IsNotEmpty({ message: "El número de identificación es obligatorio" })
  @IsString()
  tenantId!: string;

  @IsNotEmpty({ message: "El tipo de persona es obligatorio" })
  @IsString()
  personType!: "natural" | "juridica";

  @IsNotEmpty({ message: "Seleccione un plan" })
  @IsString()
  subscriptionPlan!: string;

  @IsNotEmpty({ message: "Seleccione una moneda" })
  @IsString()
  currency!: string;

  @IsNotEmpty({ message: "La contraseña es requerida" })
  @MinLength(8, { message: "Mínimo 8 caracteres" })
  tenantPassword!: string;
}

class ContactInfo {
  @IsNotEmpty({ message: "El correo es obligatorio" })
  @IsEmail({}, { message: "Correo inválido" })
  email!: string;

  @IsOptional()
  @IsUrl({}, { message: "Debe ser una URL válida" })
  website?: string;

  @IsNotEmpty({ message: "El departamento es obligatorio" })
  @IsString()
  department!: string;

  @IsNotEmpty({ message: "La ciudad es obligatoria" })
  @IsString()
  city!: string;

  @IsNotEmpty({ message: "La dirección es obligatoria" })
  @IsString()
  address!: string;

  @IsNotEmpty({ message: "La dirección es obligatoria" })
  @IsString()
  phoneNumber!: string;
}

class RepresentativeInfo {
  @IsNotEmpty({ message: "El nombre del representante legal es obligatorio" })
  @IsString()
  representativeName!: string;

  @IsNotEmpty({ message: "El tipo de documento es obligatorio" })
  @IsString()
  representativeIdType!: string;

  @IsNotEmpty({ message: "El número de documento es obligatorio" })
  @IsString()
  representativeId!: string;
}

export class CreateTenantDto {
  @ValidateNested()
  @Type(() => TenantInfo)
  tenant!: TenantInfo;

  @ValidateNested()
  @Type(() => ContactInfo)
  contact!: ContactInfo;

  @ValidateNested()
  @Type(() => RepresentativeInfo)
  representative!: RepresentativeInfo;
}
