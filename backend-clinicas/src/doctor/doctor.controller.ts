import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { DoctorService, PaginatedResult } from './doctor.service';
import { Doctor } from './doctor.entity';
import { CreateDoctorDto } from 'src/dto/doctor/create-doctor.dto';
import { ListDoctorDto }   from 'src/dto/doctor/list-doctor.dto';
import { UpdateDoctorDto } from 'src/dto/doctor/update-doctor.dto';

@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
@Controller('doctors')
export class DoctorController {
  constructor(private readonly svc: DoctorService) {}

  @Get('count')
  async count(): Promise<{ count: number }> {
    const count = await this.svc.count();
    return { count };
  }

  @Get('random')
  async random(): Promise<Doctor> {
    return this.svc.getRandom();
  }

  @Get()
  findAll(@Query() query: ListDoctorDto): Promise<PaginatedResult<Doctor>> {
    return this.svc.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Doctor> {
    return this.svc.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateDoctorDto): Promise<Doctor> {
    return this.svc.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateDoctorDto
  ): Promise<Doctor> {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.svc.remove(id);
  }
}
