import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Employee } from "./Employee";

@Entity("address")
export class Address extends AbstractEntity {
    
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ nullable: false })
    public line1: string;

    @Column({ nullable: false })
    public line2: string;

    @Column({ nullable: false })
    public street: string;

    @Column({ nullable: false })
    public state: string;
    
    @Column({ nullable: false })
    public country: string;



}