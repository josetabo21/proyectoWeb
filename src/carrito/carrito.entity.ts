// usuario-entity.ts

import {BeforeInsert, Unique, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import {VentaEntity} from "../venta/venta.entity";
import {VideojuegoEntity} from "../videojuego/videojuego.entity";

@Entity('Carrito')
export class CarritoEntity {


    @PrimaryGeneratedColumn()
    id: number;


    @ManyToOne(
        type => VentaEntity, // Tipo relacion de muchos
        // a uno
        venta => venta.carrito, // Campo donde nos guarda
        { onDelete: 'CASCADE' }
    )
    venta: VentaEntity;

    @ManyToOne(
        type => VideojuegoEntity, // Tipo relacion de muchos
        // a uno
        videojuego => videojuego.carrito, // Campo donde nos guarda
        { onDelete: 'CASCADE' }
    )
    videojuego: VideojuegoEntity;

}