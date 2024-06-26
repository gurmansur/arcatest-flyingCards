import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AtorService } from './ator.service';
import { CreateAtorDto } from './dto/create-ator.dto';
import { UpdateAtorDto } from './dto/update-ator.dto';

@Controller('ator')
export class AtorController {
  constructor(private readonly atorService: AtorService) {}

  @Post()
  create(@Body() createAtorDto: CreateAtorDto) {
    return this.atorService.create(createAtorDto);
  }

  @Get()
  findAll() {
    return this.atorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.atorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAtorDto: UpdateAtorDto) {
    return this.atorService.update(+id, updateAtorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.atorService.remove(+id);
  }
}
