import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Biome, Landform } from '../types/terrain';
import Map from './Map';
import Participant from './Participant';

@Entity()
export default class Tile {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public x: number;

  @Column()
  public y: number;

  @Column({ nullable: true })
  public landform: Landform;

  @Column({ nullable: true })
  public biome: Biome;

  @ManyToOne(() => Map, map => map.tiles, {
    cascade: true,
    eager: false
  })
  public map: Promise<Map>;

  @ManyToMany(() => Participant, participant => participant.discoveredTiles, {
    eager: false
  })
  public discoveredBy: Promise<Participant[]>;
}
