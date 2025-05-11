import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsBoolean,
  IsArray,
  ArrayMinSize,
  IsUUID,
} from 'class-validator';

export class CreateClinicaDto {
  @IsString()
  @IsNotEmpty()
  razaoSocial: string;

  @IsString()
  @IsNotEmpty()
  nomeFantasia: string;

  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  regional: string;

  @IsDateString()
  dataInauguracao: string;

  @IsBoolean()
  ativa: boolean;

  @IsArray()
  @ArrayMinSize(5)
  @IsUUID('all', { each: true })
  especialidades: string[];
}
