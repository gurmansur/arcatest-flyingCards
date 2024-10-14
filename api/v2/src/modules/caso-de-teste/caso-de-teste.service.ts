import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Projeto } from '../projeto/entities/projeto.entity';
import { SuiteDeTesteService } from '../suite-de-teste/suite-de-teste.service';
import { CreateCasoDeTesteBo } from './bo/create-caso-de-teste.bo';
import { UpdateCasoDeTesteBo } from './bo/update-caso-de-teste.bo';
import { CasoDeTesteMapper } from './caso-de-teste.mapper';
import { CasoDeTeste } from './entities/caso-de-teste.entity';

@Injectable()
export class CasoDeTesteService {
  constructor(
    @InjectRepository(CasoDeTeste)
    private casoDeTesteRepository: Repository<CasoDeTeste>,
    @Inject(forwardRef(() => SuiteDeTesteService))
    private suiteDeTesteService: SuiteDeTesteService,
  ) {}

  async create(createCasoDeTesteBo: CreateCasoDeTesteBo, projeto: Projeto) {
    const entity =
      CasoDeTesteMapper.createCasoDeTesteBoToEntity(createCasoDeTesteBo);

    if (createCasoDeTesteBo.suiteDeTesteId) {
      entity.suiteDeTeste = await this.suiteDeTesteService.findOne(
        createCasoDeTesteBo.suiteDeTesteId,
      );

      if (!entity.suiteDeTeste) {
        throw new BadRequestException('Suite de teste não encontrada');
      }
    }

    entity.projeto = projeto;

    return CasoDeTesteMapper.entityToCasoDeTesteBo(
      await this.casoDeTesteRepository.save(entity),
    );
  }

  async findAll() {
    return (
      await this.casoDeTesteRepository.find({
        relations: ['testadorDesignado', 'suiteDeTeste', 'casoDeUso'],
      })
    ).map((casoDeTeste) =>
      CasoDeTesteMapper.entityToCasoDeTesteBo(casoDeTeste),
    );
  }

  async findAllWithoutSuite() {
    return (
      await this.casoDeTesteRepository.find({
        relations: ['testadorDesignado', 'suiteDeTeste', 'casoDeUso'],
        where: { suiteDeTeste: IsNull() },
      })
    ).map((casoDeTeste) =>
      CasoDeTesteMapper.entityToCasoDeTesteBo(casoDeTeste),
    );
  }

  async findOne(id: number) {
    const casoDeTeste = await this.casoDeTesteRepository.findOne({
      where: { id },
      relations: ['testadorDesignado', 'suiteDeTeste', 'casoDeUso'],
    });

    if (!casoDeTeste) {
      throw new BadRequestException('Caso de teste não encontrado');
    }

    return CasoDeTesteMapper.entityToCasoDeTesteBo(casoDeTeste);
  }

  async update(id: number, updateCasoDeTesteBo: UpdateCasoDeTesteBo) {
    const caso = await this.casoDeTesteRepository.findOne({ where: { id } });

    const entity =
      CasoDeTesteMapper.updateCasoDeTesteBoToEntity(updateCasoDeTesteBo);

    entity.suiteDeTeste = caso.suiteDeTeste;

    return this.casoDeTesteRepository.update(id, entity);
  }

  changeSuite(id: number, suiteId: number) {
    const suite = this.suiteDeTesteService.findOne(suiteId);

    if (suiteId && !suite) {
      throw new BadRequestException('Suite de teste não encontrada');
    }

    return this.casoDeTesteRepository.update(id, {
      suiteDeTeste: { id: suiteId },
    });
  }

  remove(id: number) {
    return this.casoDeTesteRepository.softDelete(id);
  }
}
