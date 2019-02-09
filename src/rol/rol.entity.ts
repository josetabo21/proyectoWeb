// usuario-entity.ts

import {BeforeInsert, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {RolesPorUsuarioEntity} from "../rolesPorUsuario/rolesPorUsuario.entity";

@Entity('Rol')
export class RolEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column(
        {
            name: 'nombre',
            type: 'varchar',
            length: 50,
            default: 'nombre'
        }
    )
    nombre: string;


    @BeforeInsert()
    antesDeInsertar() {
        console.log('Ejecutandome antes de insertar');
    }

    @BeforeInsert()
    verificarFuncion() {
        console.log('Ejecuta despues de antes de insertar');
    }

    @OneToMany(
        type => RolesPorUsuarioEntity, // Tipo de Dato Un Usuario a muchos
        // Libros[]
        rolesPorUsuario => rolesPorUsuario.rol // Cual es el campo FK
    )
    rolesPorUsuario: RolesPorUsuarioEntity[];


}