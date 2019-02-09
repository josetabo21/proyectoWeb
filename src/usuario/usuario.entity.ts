// usuario-entity.ts

import {BeforeInsert, Unique, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {RolesPorUsuarioEntity} from "../rolesPorUsuario/rolesPorUsuario.entity";
import {VentaEntity} from "../venta/venta.entity";

@Entity('Usuario')
@Unique(["correo"])
export class UsuarioEntity {



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

    @Column(
        {
            name: 'pais',
            type: 'varchar',
            length: 50,
            default: 'pais'
        }
    )
    pais: string;

    @Column(
        {
            name: 'correo',
            type: 'varchar',
            length: 50,
            default: 'correo'
        }
    )
    correo: string;

    @Column(
        {
            name: 'password',
            type: 'varchar',
            length: 50,
            default: 'password'
        }
    )
    password: string;

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
        rolesPorUsuario => rolesPorUsuario.usuario // Cual es el campo FK
    )
    rolesPorUsuario: RolesPorUsuarioEntity[];

    @OneToMany(
        type => VentaEntity, // Tipo de Dato Un Usuario a muchos
        // Libros[]
        venta => venta.usuario // Cual es el campo FK
    )
    venta: VentaEntity[];
}