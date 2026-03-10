import { Entity, Column, PrimaryGeneratedColumn , CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";
import { text } from "stream/consumers";

@Entity('todos')
export class Todo{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(100)
    title: string;

    @Column({ type: 'text', nullable: true})
    @IsOptional()
    @MaxLength(500)
    description: string;

    @Column({default: false})
    completed: boolean;
    
    @Column({default: 1})
    priority: number;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    update: Date;
}