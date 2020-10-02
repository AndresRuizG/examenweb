import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Like, Repository } from "typeorm";
import { EjerciciosEntity } from "./ejercicios.entity";

@Injectable()
export class  EjerciciosService {
    constructor( //Inyección de Dependencias
        @InjectRepository(EjerciciosEntity)
            private repositorio: Repository<EjerciciosEntity>
    
       ){
           
    
       }
       crearUno(nuevoEjercicio:EjerciciosEntity){
    
        return this.repositorio.save(nuevoEjercicio) //promesa
    
       }
       buscarTodos(textoDeConsulta?: string) {
      
        const consulta: FindManyOptions<EjerciciosEntity> = {
            where: [
                {
                    nombre: Like(`%${textoDeConsulta}%`)
                },
                {
                    dificultad: Like(`%${textoDeConsulta}%`)
                }
            ]
        }
  
        return this.repositorio.find(consulta) // promesa
    }
    buscarUno(id: number){
        return this.repositorio.findOneOrFail(id)
     }
     editarUno(ejerciciosEditado: EjerciciosEntity){
        return this.repositorio.save(ejerciciosEditado);
     }
     eliminarUno(id: number) {
        return this.repositorio.delete(id);
    }










}