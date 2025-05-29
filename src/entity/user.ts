import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    full_name:string

    @Column({unique:true})
    email:string

    @Column()
    password:string

    @Column({type:"enum",enum:["user","driver","admin"],default:"user"})
    role:string

    @Column({nullable:true})
    vehicle_no:string

    @CreateDateColumn()
    created_at:Date
}