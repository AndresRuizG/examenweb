import {Column,PrimaryGeneratedColumn, Entity, ManyToOne} from 'typeorm'
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { MascotaEntity } from 'src/Mascota/mascota.entity';
@Entity('epn_vacuna') // nombre tabla vacuna

export class VacunaEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    nombre:string;
    @ManyToOne(
        type=> UsuarioEntity, //  con  que entidas
        usuario=>usuario.mascotas // con  que  campo  relacionamos
    )
    usuario:UsuarioEntity;

    @ManyToOne(
        type=> MascotaEntity, //  con  que entidas
        mascota=>mascota.vacunas // con  que  campo  relacionamos
    )
    mascota:MascotaEntity;
    

}