import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CasoDeTesteModule } from '../caso-de-teste/caso-de-teste.module';
import { ExecucaoDeTeste } from './entities/execucao-de-teste.entity';
import { ExecucaoDeTesteController } from './execucao-de-teste.controller';
import { ExecucaoDeTesteService } from './execucao-de-teste.service';

@Module({
  controllers: [ExecucaoDeTesteController],
  providers: [ExecucaoDeTesteService],
  imports: [TypeOrmModule.forFeature([ExecucaoDeTeste]), CasoDeTesteModule],
})
export class ExecucaoDeTesteModule {}
