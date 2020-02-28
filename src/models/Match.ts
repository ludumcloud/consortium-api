import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Map from './Map';
import Participant from './Participant';

@Entity()
export default class Match {

  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Participant, participant => participant.match, {
    cascade: true,
  })
  public participants: Participant[];

  @OneToOne(() => Map, (map) => map.match, {
    cascade: true
  })
  @JoinColumn()
  public map: Map;
}
