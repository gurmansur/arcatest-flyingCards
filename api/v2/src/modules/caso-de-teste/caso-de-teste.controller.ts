import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ProjetoAtual } from 'src/decorators/projeto-atual.decorator';
import { Serialize } from 'src/decorators/serialize.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { Projeto } from '../projeto/entities/projeto.entity';
import { CasoDeTesteMapper } from './caso-de-teste.mapper';
import { CasoDeTesteService } from './caso-de-teste.service';
import { CasoDeTesteDto } from './dto/caso-de-teste.dto';
import { CreateCasoDeTesteDto } from './dto/create-caso-de-teste.dto';
import { UpdateCasoDeTesteDto } from './dto/update-caso-de-teste.dto';

@ApiTags('Caso de Teste')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ status: 401, description: 'Não autorizado' })
@UseGuards(AuthGuard)
@Serialize()
@Controller('caso-de-teste')
export class CasoDeTesteController {
  constructor(private readonly casoDeTesteService: CasoDeTesteService) {}

  @ApiResponse({
    status: 201,
    description: 'Caso de Teste criado com sucesso',
    type: CreateCasoDeTesteDto,
    example: {
      nome: 'Caso de Teste 1',
      descricao: 'Descrição do Caso de Teste 1',
      preCondicoes: 'Pre condições do Caso de Teste 1',
      posCondicoes: 'Pos condições do Caso de Teste 1',
      cenario: 'Cenário do Caso de Teste 1',
      resultadoEsperado: 'Resultado esperado do Caso de Teste 1',
      status: 'ATIVO',
      projetoId: 1,
      suiteDeTesteId: 1,
    },
  })
  @ApiHeader({
    name: 'projeto',
    required: true,
    description: 'Id do Projeto',
    example: 1,
  })
  @Post()
  async create(
    @Body() createCasoDeTesteDto: CreateCasoDeTesteDto,
    @ProjetoAtual() projetoAtual: Projeto,
  ): Promise<CasoDeTesteDto> {
    return CasoDeTesteMapper.casoDeTesteBoToDto(
      await this.casoDeTesteService.create(
        CasoDeTesteMapper.createCasoDeTesteDtoToBo(createCasoDeTesteDto),
        projetoAtual,
      ),
    );
  }

  @ApiResponse({
    status: 200,
    description: 'Retorna a lista de Casos de Teste',
    type: [CasoDeTesteDto],
  })
  @Get()
  async findAll() {
    return (await this.casoDeTesteService.findAll()).map((casoDeTeste) =>
      CasoDeTesteMapper.casoDeTesteBoToDto(casoDeTeste),
    );
  }

  @ApiOkResponse({
    status: 200,
    description: 'Retorna o Caso de Teste',
    type: CasoDeTesteDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Caso de Teste não encontrado',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Id do Caso de Teste',
    example: 1,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return CasoDeTesteMapper.casoDeTesteBoToDto(
      await this.casoDeTesteService.findOne(+id),
    );
  }

  @ApiResponse({
    status: 200,
    description: 'Caso de Teste atualizado com sucesso',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Id do Caso de Teste',
    example: 1,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCasoDeTesteDto: UpdateCasoDeTesteDto,
  ) {
    return this.casoDeTesteService.update(
      +id,
      CasoDeTesteMapper.updateCasoDeTesteDtoToBo(updateCasoDeTesteDto),
    );
  }

  @ApiOkResponse({
    status: 200,
    description: 'Caso de Teste removido com sucesso',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Id do Caso de Teste',
    example: 1,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.casoDeTesteService.remove(+id);
  }
}
