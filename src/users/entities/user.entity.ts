import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  frist_name: string;
  @Column({ nullable: true })
  last_name: string;
  @Column({ nullable: true })
  email: string;
  @Column({ nullable: true })
  password: string;
}
