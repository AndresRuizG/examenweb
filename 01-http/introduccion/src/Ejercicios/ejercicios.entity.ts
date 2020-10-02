import {PrimaryGeneratedColumn,Column,Entity, ManyToOne, OneToMany} from 'typeorm'
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { VacunaEntity } from 'src/Vacuna/vacuna.entity';
@Entity('examen_ejercicios')
export class EjerciciosEntity{
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id'
    })
    id:number;

    @Column({
        name: 'nombre',
        type: 'varchar',
        nullable: true
    })
    nombre?: string
    @Column({
        name: 'dificultad',
        type: 'varchar',
        nullable: true
    })
    dificultad?:string;
    @Column({
        name:'kilometros',
        nullable:true,
        type:'decimal', 
        precision:10,//10000000000.
        scale:4,//0.0001       


    })
    kilometros?:number;



}