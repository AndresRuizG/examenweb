// @IsAlpha() 
// @IsNotEmpty() 
// @MinLength() 
// @MaxLength() 
// @IsBoolean() 
// @IsEmpty()
 // @IsInt() 
 // @IsPositive() 
 // @IsOptional()
  // @IsNumber()
  import{IsAlpha,MaxLength,MinLength,IsBoolean,IsEmpty,IsInt,IsPositive,IsOptional,IsNumber} from 'class-validator'
export class MascotaCreateDto{
    @IsAlpha()
    @MinLength(3)
    @MaxLength(50)
    nombre:string;
    @IsNumber()
    edad:number;
    @IsBoolean()
    casada:boolean;
    @IsBoolean()
    ligada?:boolean; //aveces si existe la propiedad o no 
    @IsNumber()
    peso: number;
}