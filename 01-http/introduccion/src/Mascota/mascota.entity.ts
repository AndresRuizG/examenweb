import {PrimaryGeneratedColumn,Column,Entity, ManyToOne, OneToMany} from 'typeorm'
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { VacunaEntity } from 'src/Vacuna/vacuna.entity';
@Entity('epn_mascota')
export class MascotaEntity{

@PrimaryGeneratedColumn()
    id:number;
    @Column()
    nombre:string;
    @ManyToOne(
        type=> UsuarioEntity, //  con  que entidas
        usuario=>usuario.mascotas // con  que  campo  relacionamos
    )
    usuario:UsuarioEntity
    @OneToMany(
        type=>VacunaEntity,
        vacuna=>vacuna.mascota
    )
    vacunas:VacunaEntity[];



}