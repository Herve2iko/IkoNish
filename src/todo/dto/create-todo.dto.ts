import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateTodoDto{
        @IsNotEmpty()
        @MinLength(4)
        @MaxLength(100)
        title: string;
    
        @IsOptional()
        @MaxLength(500)
        description: string;
    
        @IsOptional()
        @IsBoolean()
        completed: boolean;
        
        @IsOptional()
        @IsNumber()
        @Min(1)
        @Max(3)
        priority: number;
}