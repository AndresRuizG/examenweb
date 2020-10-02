import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpJuegoModule } from "./http/http-juego.module";
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario/usuario.entity';
import { VacunaModule } from './Vacuna/vacuna.module';
import { MascotaModule } from './Mascota/mascota.module';
import { VacunaEntity } from './Vacuna/vacuna.entity';
import { MascotaEntity } from './Mascota/mascota.entity';
import { EjerciciosEntity } from './Ejercicios/ejercicios.entity';
import { EjerciciosModule } from './Ejercicios/ejercicios.module';


@Module({
  imports: [
    //aqui otros modulos
    //HttpJuegoModule,
        UsuarioModule,
        MascotaModule,
        VacunaModule,
        EjerciciosModule,
    ////////////////////////////////////////////////
    //revisar documentación en https://docs.nestjs.com/techniques/database para otras bases de datos esta en //MYSQL
    /////////
    //Caden de conexion
 
    TypeOrmModule.forRoot({
        name: 'default',//nombre conexion))
        type: 'mysql', // mysql postgres
        host: 'localhost', //ip
        port: 3306, //puerto
        username: 'root', //usuario
        password: 'root', // pasword
        database: 'test', // base de datos
        entities: [

          UsuarioEntity,
          VacunaEntity,
          MascotaEntity,
          EjerciciosEntity
        ],
        synchronize: true, // actualiza el esquema de la base de datos
        dropSchema: false,  //eliminar datos y el esquema de base de datos // 
        //para levantar primera vez true
      }),
  ],
  controllers: [
    //controladores del APP MODULE
    AppController],
  providers: [
    //Servicios  APP MODULE
    AppService],
})
export class AppModule {}
