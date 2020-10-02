import{IsAlpha,MaxLength,MinLength,IsBoolean,IsEmpty,IsInt,IsPositive,IsOptional,IsNumber} from 'class-validator'
export class UsuarioUpdateDTO{
    @IsAlpha()
    @MinLength(3)
    @MaxLength(50)
     nombre:string;
    @IsAlpha()   
    @MaxLength(50)
     apellido?:string;
    @IsAlpha() 
    @MaxLength(25) 
     cedula:boolean;
    @IsAlpha()
    fechaNacimiento?:boolean;
    
}