import { Injectable } from "@nestjs/common";
import { MascotaEntity } from "./mascota.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()

export class MascotaService{
    constructor(
        @InjectRepository(MascotaEntity)
         private repositorio: Repository<MascotaEntity>
        ){
            
    } 
    crearNuevaMascota(mascota:MascotaEntity){
        return this.repositorio.save(mascota);
    }          
}