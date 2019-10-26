import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Tile from './Tile';

@Entity()
export default class Grid {

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

  @OneToMany(() => Tile, tile => tile.grid, {
    eager: false
  })
  public tiles: Promise<Tile[]>;
}
