import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateExecucaoDeTesteDto } from './dto/create-execucao-de-teste.dto';
import { UpdateExecucaoDeTesteDto } from './dto/update-execucao-de-teste.dto';
import { ExecucaoDeTesteService } from './execucao-de-teste.service';

@ApiTags('Execução de Teste')
@Controller('execucao-de-teste')
export class ExecucaoDeTesteController {
  constructor(
    private readonly execucaoDeTesteService: ExecucaoDeTesteService,
  ) {}

  @Post()
  create(@Body() createExecucaoDeTesteDto: CreateExecucaoDeTesteDto) {
    return this.execucaoDeTesteService.create(createExecucaoDeTesteDto);
  }

  @Get()
  findAll() {
    return this.execucaoDeTesteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.execucaoDeTesteService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExecucaoDeTesteDto: UpdateExecucaoDeTesteDto,
  ) {
    return this.execucaoDeTesteService.update(+id, updateExecucaoDeTesteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.execucaoDeTesteService.remove(+id);
  }
}
