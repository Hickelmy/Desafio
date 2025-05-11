import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsBoolean,
  IsArray,
  ArrayMinSize,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class UpdateClinicaDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  razaoSocial?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nomeFantasia?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  cnpj?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  regional?: string;

  @IsOptional()
  @IsDateString()
  dataInauguracao?: string;

  @IsOptional()
  @IsBoolean()
  ativa?: boolean;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(5)
  @IsUUID('all', { each: true })
  especialidades?: string[];
}
