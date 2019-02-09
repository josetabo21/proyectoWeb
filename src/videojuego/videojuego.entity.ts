// usuario-entity.ts

import {BeforeInsert, Unique, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import {CarritoEntity} from "../carrito/carrito.entity";


@Entity('Videojuego')
export class VideojuegoEntity {

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
            name: 'descripcion',
            type: 'varchar',
            length: 100,
            default: 'descipcion'
        }
    )
    descripcion: string;


    @Column(
        {
            name: 'precio',
            type: 'decimal',
            default: 0
        }
    )
    precio: number;


    @Column(
        {
            name: 'fechaLanzamiento',
            type: 'date'
        }
    )
    fechaLanzamiento: Date;

    @Column(
        {
            name: 'genero',
            type: 'varchar',
            length: 100,
            default: 'genero'
        }
    )
    genero: string;

    @Column(
        {
            name: 'trailer',
            type: 'varchar',
            length: 100,
            default: 'trailer'
        }
    )
    trailer: string;

    @BeforeInsert()
    antesDeInsertar() {
        console.log('Ejecutandome antes de insertar');
    }

    @BeforeInsert()
    verificarFuncion() {
        console.log('Ejecuta despues de antes de insertar');
    }

    @OneToMany(
        type => CarritoEntity, // Tipo de Dato Un Usuario a muchos
        // Libros[]
        carrito => carrito.videojuego // Cual es el campo FK
    )
    carrito: CarritoEntity[];
}