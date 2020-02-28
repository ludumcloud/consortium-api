import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Participant from './Participant';

@Entity()
export default class User {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public username: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column()
  public salt: string;

  @Column()
  public name: string;

  @OneToMany(() => Participant, participant => participant.user, {
    eager: false
  })
  participants: Promise<Participant[]> ;
}
