import { UserStory } from 'src/modules/user-story/entities/user-story.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TAGS')
export class Tag {
  @PrimaryGeneratedColumn({ type: 'int', name: 'tag_id' })
  id: number;

  @Column({ type: 'varchar', name: 'tag_nome' })
  nome: string;

  @Column({ type: 'varchar', name: 'tag_cor' })
  cor: string;

  @ManyToMany(() => UserStory)
  userStory: UserStory;
}
