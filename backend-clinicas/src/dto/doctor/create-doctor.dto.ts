import { IsString, IsEnum, IsOptional, IsNotEmpty, MaxLength } from 'class-validator';
import { DoctorStatus } from 'src/doctor/doctor.entity';

export class CreateDoctorDto {
  @IsString() @IsNotEmpty() @MaxLength(100)
  name: string;

  @IsString() @IsNotEmpty() @MaxLength(20)
  crm: string;

  @IsString() @IsNotEmpty() @MaxLength(100)
  specialty: string;

  @IsString() @IsOptional() @MaxLength(20)
  phone?: string;

  @IsString() @IsOptional() @MaxLength(100)
  email?: string;

  @IsEnum(DoctorStatus) @IsOptional()
  status?: DoctorStatus;
}
