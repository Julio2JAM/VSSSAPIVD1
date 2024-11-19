import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type:"varchar", length:"20", nullable: false})
  @IsNotEmpty({message:"codigo necesario."})
  @MaxLength(20, {message: "Codigo no valido."})
  code!: string;

  @Column({type:"varchar", length:"100", nullable: false})
  @IsNotEmpty({message:"Nombre necesario."})
  @MaxLength(100, {message: "Nombre no valido."})
  name!: string;

  @Column({type:"varchar", length:"1000", nullable: true})
  @IsOptional()
  description!: string;
  
  @Column({type:"tinyint", nullable: false, default: 1})
  @IsOptional()
  id_status!: number;

  @CreateDateColumn({ type: 'timestamp' })
  date!: Date
}
