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
import { CreateClinicaDto } from 'src/dto/create-clinica.dto';
import { UpdateClinicaDto } from 'src/dto/update-clinica.dto';
import { Clinica } from './clinica.entity';
import { PaginationDto } from 'src/dto/pagination.dto';
import { PaginatedResult } from 'src/dto/paginated-result.interface';

@UseGuards(AuthGuard('jwt'))
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller('clinicas')
export class ClinicasController {
  constructor(private readonly clinicasService: ClinicasService) {}

  @Get()
  findAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedResult<Clinica>> {
    return this.clinicasService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.clinicasService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateClinicaDto) {
    return this.clinicasService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateClinicaDto,
  ) {
    return this.clinicasService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.clinicasService.remove(id);
  }
}
