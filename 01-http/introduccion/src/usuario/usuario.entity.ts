// usuario.entity.ts
import {Column, Entity, PrimaryGeneratedColumn, Index, OneToMany} from 'typeorm';
import { MascotaEntity } from 'src/Mascota/mascota.entity';
@Index([
    'nombre',
    'apellido',
    'cedula',
    'fechaNacimiento', //nombre de las propiedades en la clase.
])
/*//INDEX COMPUESTO
@Index(
    [
    'nombre',
    'apellido',
    'cedula',
    'fechaNacimiento', //nombre de las propiedades en la clase.
     ],
    {unique:true}   
)/*/
@Entity('epn_usuario') // nombre tabla usuario
export class UsuarioEntity{
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id'
    })
    id: number;
    @Column({
        name: 'nombre',
        type: 'varchar',
        nullable: true
    })
    nombre?: string
    @Column({
        name: 'apellido',
        type: 'varchar',
        nullable: true,
        length: '60'
    })
    apellido?: string
    @Column({
        name: 'cedula',
        type: 'varchar',
        nullable: false,
        unique: true,
        length: '18'
    })
    cedula: string
    @Column({
        name:'sueldo',
        nullable:true,
        type:'decimal', 
        precision:10,//10000000000.
        scale:4,//0.0001        


    })
    sueldo?:number;
    @Column({
        nullable:true,
        type:'date', 
        name:'fecha_nacimiento'
       


    })
    fechaNacimiento?:string;
    @Column({
        nullable:true,
        type:'date', 
        name:'fecha_hora_nacimiento'
       


    })
    fechaHoraNacimiento?:string;
    @OneToMany(
        type => MascotaEntity, // que entidad nos relacionamos
        mascota=>mascota.usuario

    )
    mascotas:MascotaEntity[];



}