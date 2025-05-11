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
} from '@nestjs/common';
import { ClinicasService } from './clinicas.service';

import { AuthGuard } from '@nestjs/passport';
import { CreateClinicaDto } from 'src/dto/create-clinica.dto';
import { UpdateClinicaDto } from 'src/dto/update-clinica.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('clinicas')
export class ClinicasController {
  constructor(private readonly clinicasService: ClinicasService) {}

  @Get()
  findAll(@Query('search') search?: string) {
    return this.clinicasService.findAll(search);
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
