import{IsAlpha,MaxLength,MinLength,IsBoolean,IsEmpty,IsInt,IsPositive,IsOptional,IsNumber} from 'class-validator'
export class EjerciciosCreateDTO{
    @IsAlpha()
    @MinLength(3)
    @MaxLength(50)
     nombre:string;
    @IsAlpha()   
    @MaxLength(50)
     dificultad?:string;
    @IsNumber() 
    @MaxLength(25) 
     kilometros:boolean;
    
}