import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Biome, Landform } from '../types/terrain';
import Map from './Map';

@Entity()
export default class Tile {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  x: number;

  @Column()
  y: number;

  @Column({ nullable: true })
  landform: Landform;

  @Column({ nullable: true })
  biome: Biome;

  @ManyToOne(() => Map, map => map.tiles, {
    eager: false
  })

  map: Promise<Map>;
}
