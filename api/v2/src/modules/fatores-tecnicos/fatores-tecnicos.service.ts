import { Injectable } from '@nestjs/common';
import { CreateFatoresTecnicoDto } from './dto/create-fatores-tecnico.dto';
import { UpdateFatoresTecnicoDto } from './dto/update-fatores-tecnico.dto';

@Injectable()
export class FatoresTecnicosService {
  create(createFatoresTecnicoDto: CreateFatoresTecnicoDto) {
    return 'This action adds a new FatorTecnico';
  }

  findAll() {
    return `This action returns all fatoresTecnicos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} FatorTecnico`;
  }

  update(id: number, updateFatoresTecnicoDto: UpdateFatoresTecnicoDto) {
    return `This action updates a #${id} FatorTecnico`;
  }

  remove(id: number) {
    return `This action removes a #${id} FatorTecnico`;
  }
}
