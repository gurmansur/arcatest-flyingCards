import { Priorizacao } from 'src/modules/priorizacao/entities/priorizacao.entity';
import { Projeto } from 'src/modules/projeto/entities/projeto.entity';
import { StatusPriorizacao } from 'src/modules/status-priorizacao/entities/status-priorizacao.entity';
import { Usuario } from 'src/modules/usuario/entities/usuario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('STAKEHOLDERS')
export class Stakeholder {
  @PrimaryGeneratedColumn({ type: 'int', name: 'STA_ID' })
  id: number;

  @Column('varchar', { name: 'STA_CHAVE', length: 100 })
  chave: string;

  @Column('varchar', { name: 'STA_SENHA', length: 100 })
  senha: string;

  @Column('varchar', { name: 'STA_NOME', length: 100 })
  nome: string;

  @Column('varchar', { name: 'STA_CARGO', length: 50 })
  cargo: string;

  @Column('varchar', { name: 'STA_EMAIL', length: 255 })
  email: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.stakeholders)
  @JoinColumn({ name: 'FK_USUARIOS_USU_ID' })
  usuario: Usuario;

  @ManyToOne(() => Projeto, (projeto) => projeto.stakeholders)
  @JoinColumn({ name: 'FK_PROJETOS_PRO_ID' })
  projeto: Projeto;

  @OneToMany(() => Priorizacao, (priorizacao) => priorizacao.stakeholder)
  priorizacoes: Priorizacao[];

  @OneToMany(
    () => StatusPriorizacao,
    (statusPriorizacao) => statusPriorizacao.stakeholder,
  )
  statusPriorizacao: StatusPriorizacao[];
}