// usuario-entity.ts

import {BeforeInsert, Unique, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {CarritoEntity} from "../carrito/carrito.entity";

@Entity('Venta')
export class VentaEntity {



    @PrimaryGeneratedColumn()
    id: number;

    @Index()

    @Column(
        {
            name: 'fechaVenta',
            type: 'date'
        }
    )
    fechaVenta: Date;

    @BeforeInsert()
    antesDeInsertar() {
        console.log('Ejecutandome antes de insertar');
    }

    @BeforeInsert()
    verificarFuncion() {
        console.log('Ejecuta despues de antes de insertar');
    }

    @ManyToOne(
        type => UsuarioEntity, // Tipo relacion de muchos
        // a uno
        usuario => usuario.venta, // Campo donde nos guarda
        { onDelete: 'CASCADE' }
    )
    usuario: UsuarioEntity;

    @OneToMany(
        type => CarritoEntity, // Tipo de Dato Un Usuario a muchos
        // Libros[]
        carrito => carrito.venta // Cual es el campo FK
    )
    carrito: CarritoEntity[];


}