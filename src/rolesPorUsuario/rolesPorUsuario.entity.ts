// libro.entity.ts

import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {RolEntity} from "../rol/rol.entity";

@Entity('RolesPorUsuario')
export class RolesPorUsuarioEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        type => UsuarioEntity, // Tipo relacion de muchos
        // a uno
        usuario => usuario.rolesPorUsuario, // Campo donde nos guarda
        { onDelete: 'CASCADE' }
    )
    usuario: UsuarioEntity;
    @ManyToOne(
        type => RolEntity, // Tipo relacion de muchos
        // a uno
        rol => rol.rolesPorUsuario, // Campo donde nos guarda
        { onDelete: 'CASCADE' }
    )
    rol: RolEntity;
}
