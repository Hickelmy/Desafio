import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EspecialidadeService } from './especialidade.service';
import { CreateEspecialidadeDto } from 'src/dto/specialty/create-especialidade.dto';
import { UpdateEspecialidadeDto } from 'src/dto/specialty/update-especialidade.dto';


@Controller('especialidades')
export class EspecialidadeController {
  constructor(private readonly service: EspecialidadeService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateEspecialidadeDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEspecialidadeDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
