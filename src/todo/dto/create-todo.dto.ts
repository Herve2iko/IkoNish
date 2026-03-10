import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateTodoDto{
        @ApiProperty({
                description: 'Le titre de la Tache',
                required: true,
                minLength: 3,
                maxLength: 100,
                example: 'Kwiga NestJs'
        })
        @IsNotEmpty()
        @MinLength(4)
        @MaxLength(100)
        title: string;

        @ApiProperty({
                description: 'Description détailéé de la Tache',
                required: false,
                maxLength: 500,
                example: 'Kugira crud muri NestJs'
        })
        @IsOptional()
        @MaxLength(500)
        description: string;
    
        @ApiProperty({
                description: 'Statut de la Tache',
                required: false,
                default: false,
                example: false
        })
        @IsOptional()
        @IsBoolean()
        completed: boolean;
        
        @ApiProperty({
                description: 'Priorite de la Tache(1: Base, 2: Moyenne, 3: Haute)',
                required: false,
                default:1,
                minLength:1,
                maxLength: 3,
                example: 2
        })
        @IsOptional()
        @IsNumber()
        @Min(1)
        @Max(3)
        priority: number;
}