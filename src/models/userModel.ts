// src/models/userEntity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index, JoinColumn } from 'typeorm';
import { Role } from './roleModel';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Role, {nullable: true})
  @JoinColumn({name:"id_role"})
  @Index("user_fk_1")
  role!: Role

  @Column({ type: 'varchar', length: 60, nullable: false})
  email!: string;
  
  @Column({type: 'varchar', length: 80, nullable: false})
  password!: string
}
