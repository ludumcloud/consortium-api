import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn  } from 'typeorm';
import Tile from './Tile';
import User from './User';

@Entity()
export default class HexagonalGrid extends BaseEntity {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public width: number;

  @Column()
  public height: number;

  @Column()
  public seed: string;

  @ManyToMany(() => User, user => user.id)
  public owner: User;

  @OneToMany(() => Tile, tile => tile.id, {
    eager: false
  })
  public tiles: Promise<Tile[]>;
}
