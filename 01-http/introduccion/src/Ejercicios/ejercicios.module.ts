import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';

import { EjerciciosController } from "./ejercicios.controller";
import { EjerciciosEntity } from "./ejercicios.entity";
import { EjerciciosService } from "./ejercicios.service";



//@Nombre() -> Decorador
@Module({
    imports:[
        
        TypeOrmModule.forFeature(

            [
                EjerciciosEntity

            ],
            'default' //nombre cadena de conexión
        )
    ],
    controllers:[
        EjerciciosController
    ],
    providers:[
        EjerciciosService
       
    ],
})
export class EjerciciosModule{

}