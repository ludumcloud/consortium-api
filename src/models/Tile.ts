import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn  } from 'typeorm';
import { Terrain } from '../utils/mapHelpers';
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

  @Column('json')
  terrain: Terrain;

  @ManyToOne(() => HexagonalGrid, grid => grid.id)
  grid: HexagonalGrid;
}
