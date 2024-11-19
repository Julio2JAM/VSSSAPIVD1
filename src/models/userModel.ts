import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index, JoinColumn, CreateDateColumn } from 'typeorm';
import { Role } from './roleModel';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Role, {nullable: true})
  @JoinColumn({name:"id_role"})
  @Index("user_fk_1")
  role!: Role

  @IsNotEmpty({message:"Email necesario"})
  @IsEmail()
  @Column({ type: 'varchar', length: 60, nullable: false, unique:true})
  email!: string;
  
  @IsNotEmpty({message:"Contraseña necesaria"})
  @Column({type: 'varchar', length: 80, nullable: false})
  password!: string

  @Column({type:"tinyint", nullable: false, default: 1})
  @IsOptional()
  id_status!: number;

  @CreateDateColumn({ type: 'timestamp' })
  date!:Date
}
