// usuario.module.ts

import {Module} from "@nestjs/common";
import {CarritoService} from "./carrito.service";
import {CarritoController} from "./carrito.controller";
import {TypeOrmModule} from '@nestjs/typeorm';
import {CarritoEntity} from "./carrito.entity";


@Module({
    imports: [
        // Repositorio
        TypeOrmModule
            .forFeature(
                [
                    CarritoEntity
                ]
            ),
    ],
    controllers: [
        CarritoController
    ],
    providers: [
        CarritoService
    ],
    exports: [
        CarritoService
    ]
})
export class CarritoModule {
}
