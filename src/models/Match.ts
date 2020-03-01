import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Map from './Map';
import Participant from './Participant';

@Entity()
export default class Match {

  @PrimaryGeneratedColumn()
  public id: number;

  @OneToMany(() => Participant, participant => participant.match, {
    cascade: true,
    eager: true
  })
  public participants: Participant[];

  @OneToOne(() => Map, (map) => map.match, {
    cascade: true,
    eager: false
  })
  @JoinColumn()
  public map: Promise<Map>;
}
