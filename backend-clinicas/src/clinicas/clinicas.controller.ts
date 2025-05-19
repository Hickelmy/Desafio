import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ClinicasService } from './clinicas.service';
import { Clinica } from './clinica.entity';
import { PaginationDto } from 'src/dto/pagination.dto';
import { PaginatedResult } from 'src/dto/paginated-result.interface';
import { CreateClinicaDto } from 'src/dto/clinic/create-clinica.dto';
import { UpdateClinicaDto } from 'src/dto/clinic/update-clinica.dto';

@UseGuards(AuthGuard('jwt'))
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller('clinicas')
export class ClinicasController {
  constructor(private readonly clinicasService: ClinicasService) {}

  @Get('count')
  async count(): Promise<{ count: number }> {
    const count = await this.clinicasService.count();
    return { count };
  }

  @Get()
  findAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedResult<Clinica>> {
    return this.clinicasService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe()) id: string
  ): Promise<Clinica> {
    return this.clinicasService.findOne(id);
  }

  @Post()
  create(
    @Body() dto: CreateClinicaDto
  ): Promise<Clinica> {
    return this.clinicasService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateClinicaDto,
  ): Promise<Clinica> {
    return this.clinicasService.update(id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id', new ParseUUIDPipe()) id: string
  ): Promise<void> {
    return this.clinicasService.remove(id);
  }
}
