import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacunaEntity } from "./vacuna.entity";



//@Nombre() -> Decorador
@Module({
    imports:[
        TypeOrmModule.forFeature(

            [
                VacunaEntity

            ],
            'default' //nombre cadena de conexión
        )
    ],
    controllers:[
       
    ],
    providers:[
        
       
    ],
})
export class VacunaModule{

}