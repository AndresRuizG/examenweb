
  import{IsInt,IsNumber} from 'class-validator'
export class NumerosCreateDto{
    @IsNumber()
    
    n1:number;
    @IsNumber()
    n2:number;

   
   
}