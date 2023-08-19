import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  conteudo: string;

  @Column()
  autor: string

  @Column()
  dataPublicacao: Date

  @Column({default: true})
  isActive: boolean;
}