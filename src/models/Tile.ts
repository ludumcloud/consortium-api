import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Biome, Landform } from '../types/terrain';
import Grid from './Grid';

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

  @ManyToOne(() => Grid, grid => grid.tiles, {
    eager: false
  })
  grid: Promise<Grid>;
}
