import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column({ nullable: true })
  public exponent: number;

  @OneToMany(() => Tile, tile => tile.map, {
    eager: false
  })
  public tiles: Promise<Tile[]>;
}
