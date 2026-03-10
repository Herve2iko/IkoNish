import { Entity, Column, PrimaryGeneratedColumn , CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";
import { text } from "stream/consumers";
import { ApiProperty } from "@nestjs/swagger";

@Entity('todos')
export class Todo{
    @ApiProperty({ description: 'ID unique de la tâche', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Titre de la Tache', example: 'Kwiga NestJs' })
    @Column({ length: 100 })
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(100)
    title: string;

    @ApiProperty({ description: 'detail de la tache', example: "ivyo uzokora kuriyo tache",required: false })
    @Column({ type: 'text', nullable: true})
    @IsOptional()
    @MaxLength(500)
    description: string;

    @ApiProperty({ description: 'Statut (terminé ou non)', example: false,required: false })
    @Column({default: false})
    completed: boolean;
    
    @ApiProperty({ description: 'Niveau de priorité (1-3)', example: 2,required: false })
    @Column({default: 1})
    priority: number;
    
    @ApiProperty({ description: 'Date de Creation'})
    @CreateDateColumn()
    createAt: Date;

    @ApiProperty({ description: 'Date de Modification'})
    @UpdateDateColumn()
    update: Date;
}