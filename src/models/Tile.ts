import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn  } from 'typeorm';
import { Biomes } from '../types/map';
import HexagonalGrid from './HexagonalGrid';

@Entity()
export default class Tile extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  x: number;

  @Column()
  y: number;

  @Column()
  z: number;

  @Column()
  type: Biomes;

  @ManyToOne(() => HexagonalGrid, grid => grid.id)
  grid: HexagonalGrid;
}
