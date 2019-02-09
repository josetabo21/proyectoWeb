// usuario.module.ts

import {Module} from "@nestjs/common";
import {VideojuegoService} from "./videojuego.service";
import {VideojuegoController} from "./videojuego.controller";
import {TypeOrmModule} from '@nestjs/typeorm';
import {VideojuegoEntity} from "./videojuego.entity";


@Module({
    imports: [
        // Repositorio
        TypeOrmModule
            .forFeature(
                [
                    VideojuegoEntity
                ]
            ),
    ],
    controllers: [
        VideojuegoController
    ],
    providers: [
        VideojuegoService
    ],
    exports: [
        VideojuegoService
    ]
})
export class VideojuegoModule {
}
