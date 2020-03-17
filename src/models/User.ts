import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Participant from './Participant';

@Entity()
export default class User {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public username: string;

  @Exclude()
  @Column()
  public email: string;

  @Exclude()
  @Column({ select: false })
  public password: string;

  @Exclude()
  @Column({ select: false })
  public salt: string;

  @Column()
  public name: string;

  @OneToMany(() => Participant, participant => participant.user, {
    eager: false
  })
  participants: Promise<Participant[]> ;
}
