import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { MascotaEntity } from "./mascota.entity";
import { MascotaService } from "./mascota.service";



//@Nombre() -> Decorador
@Module({
    imports:[
        TypeOrmModule.forFeature(

            [
                MascotaEntity

            ],
            'default' //nombre cadena de conexión
        )
    ],
    controllers:[
       
    ],
    providers:[
        MascotaService
        
       
    ],
    exports:[
        MascotaService
    ]
})
export class MascotaModule{

}