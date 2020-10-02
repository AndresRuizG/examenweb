import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioService } from "./usuario.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from "./usuario.entity";
import { MascotaModule } from "src/Mascota/mascota.module";



//@Nombre() -> Decorador
@Module({
    imports:[
        MascotaModule,
        TypeOrmModule.forFeature(

            [
                UsuarioEntity

            ],
            'default' //nombre cadena de conexión
        )
    ],
    controllers:[
        UsuarioController
    ],
    providers:[
        UsuarioService
       
    ],
})
export class UsuarioModule{

}