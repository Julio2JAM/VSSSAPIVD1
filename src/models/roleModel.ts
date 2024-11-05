import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type:"varchar", length:20, nullable:false, unique:true })
    code!: string;

    @Column({type:"varchar", length:20, nullable:false})
    name!: string;
}

export enum RoleType {
    "ADMIN" = 1,
    "PROFESSOR",
    "STUDENT",
}