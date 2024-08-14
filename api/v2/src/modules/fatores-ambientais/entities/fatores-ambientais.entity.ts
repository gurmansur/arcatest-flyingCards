import { FatorAmbientalProjeto } from 'src/modules/fator-ambiental-projeto/entities/fator-ambiental-projeto.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('FATORES_AMBIENTAIS')
export class FatorAmbiental {
  @PrimaryGeneratedColumn({ type: 'int', name: 'AMB_ID' })
  id: number;

  @Column('varchar', { name: 'AMB_DESCRICAO', length: 255 })
  descricao: string;

  @Column('double', { name: 'AMB_PESO', precision: 4, scale: 2 })
  peso: number;

  @OneToMany(
    () => FatorAmbientalProjeto,
    (fatorAmbientalProjeto) => fatorAmbientalProjeto.fatorAmbiental,
  )
  projetos: FatorAmbientalProjeto[];
}