import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequisitoService } from '../requisito/requisito-funcional.service';
import { CreateCasoUsoDto } from './dto/create-caso-uso.dto';
import { UpdateCasoUsoDto } from './dto/update-caso-uso.dto';
import { CasoUso } from './entities/caso-uso.entity';

@Injectable()
export class CasoUsoService {
  constructor(
    @InjectRepository(CasoUso)
    private readonly casoUsoRepository: Repository<CasoUso>,
    @Inject() private readonly requisitosService: RequisitoService,
  ) {}

  async create(createCasoUsoDto: CreateCasoUsoDto) {
    const casoUso = this.casoUsoRepository.create(createCasoUsoDto);
    return await this.casoUsoRepository.save(casoUso);
  }

  async findAll(requisitoId: number, page = 0, pageSize = 10) {
    const take = pageSize ? pageSize : 10;
    const skip = page ? page * take : 0;
    const [items, count] = await this.casoUsoRepository.findAndCount({
      where: { requisitoFuncional: { id: requisitoId } },
      take,
      skip,
    });

    return {
      items,
      page: {
        size: take,
        totalElements: count,
        totalPages: Math.ceil(count / take),
        number: page ? page : 0,
      },
    };
  }

  async findByNome(nome: string) {
    try {
      return await this.casoUsoRepository.find({ where: { nome } });
    } catch (error) {
      console.error(error);
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    try {
      return await this.casoUsoRepository.findOne({ where: { id } });
    } catch (error) {
      console.error(error);
      if (!id) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  getMetrics(
    requisitoFuncional: number,
    option?: 'SIMPLES' | 'MEDIO' | 'COMPLEXO',
  ) {
    return this.casoUsoRepository.count({
      where: {
        requisitoFuncional: { id: requisitoFuncional },
        complexidade: option,
      },
    });
  }

  async update(
    id: number,
    requisitoId: number,
    updateCasoUsoDto: UpdateCasoUsoDto,
  ) {
    const requisito = await this.requisitosService.getById(requisitoId);
    if (!requisito) return 'Projeto não encontrado';

    return this.casoUsoRepository.update(id, {
      ...updateCasoUsoDto,
      requisitoFuncional: requisito,
    });
  }

  remove(id: number) {
    try {
      return this.casoUsoRepository.delete(id);
    } catch (error) {
      if (!id) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
