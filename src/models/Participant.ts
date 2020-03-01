import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Match from './Match';
import Tile from './Tile';
import User from './User';

@Entity()
export default class Participant {

  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Match, match => match.participants, {
    eager: false
  })
  public match: Promise<Match>;

  @ManyToOne(() => User, user => user.participants, {
    cascade: true,
    eager: true
  })
  public user: User;

  @ManyToMany(() => Tile, tile => tile.discoveredBy, {
    cascade: true,
    eager: false
  })
  @JoinTable()
  public discoveredTiles: Promise<Tile[]>;
}
