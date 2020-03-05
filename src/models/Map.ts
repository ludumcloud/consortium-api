import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Match from './Match';
import Tile from './Tile';

@Entity()
export default class Map {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public width: number;

  @Column()
  public height: number;

  @Column()
  public seed: string;

  @Column({ type: 'float', nullable: true })
  public exponent: number;

  @OneToMany(() => Tile, tile => tile.map, {
    eager: false
  })
  public tiles: Promise<Tile[]>;

  @OneToOne(() => Match, match => match.map, {
    eager: false
  })
  public match: Promise<Match>;
}
