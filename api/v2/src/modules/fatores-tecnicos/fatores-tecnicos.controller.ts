import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FatoresTecnicosService } from './fatores-tecnicos.service';
import { CreateFatoresTecnicoDto } from './dto/create-fatores-tecnico.dto';
import { UpdateFatoresTecnicoDto } from './dto/update-fatores-tecnico.dto';

@Controller('fatores-tecnicos')
export class FatoresTecnicosController {
  constructor(private readonly fatoresTecnicosService: FatoresTecnicosService) {}

  @Post()
  create(@Body() createFatoresTecnicoDto: CreateFatoresTecnicoDto) {
    return this.fatoresTecnicosService.create(createFatoresTecnicoDto);
  }

  @Get()
  findAll() {
    return this.fatoresTecnicosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fatoresTecnicosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFatoresTecnicoDto: UpdateFatoresTecnicoDto) {
    return this.fatoresTecnicosService.update(+id, updateFatoresTecnicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fatoresTecnicosService.remove(+id);
  }
}
