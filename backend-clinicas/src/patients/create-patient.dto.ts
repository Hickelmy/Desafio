import { IsString, IsNotEmpty, Matches, IsEmail, IsDateString, IsOptional, IsEnum } from 'class-validator';

const CPF_REGEX = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

export class CreatePatientDto {
  @IsString() @IsNotEmpty()         name: string;
  @IsString() @Matches(CPF_REGEX)   cpf: string;
  @IsString() @Matches(/^\(\d{2}\)\s?\d{4,5}-\d{4}$/) phone: string;
  @IsEmail()                         email: string;
  @IsDateString()                    dob: string;
  @IsEnum(['Active','Inactive']) @IsOptional() status?: 'Active' | 'Inactive';
  @IsString() @IsNotEmpty()         doctor: string;
  @IsDateString() @IsOptional()     lastVisit?: string;
  @IsOptional()                     avatar?: string;
}
