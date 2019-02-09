// usuario.module.ts

import {Module} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioController} from "./usuario.controller";
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsuarioEntity} from "./usuario.entity";
import {RolesPorUsuarioModule} from "../rolesPorUsuario/rolesPorUsuario.module";
import {RolModule} from "../rol/rol.module";
import {VentaModule} from "../venta/venta.module";
import {CarritoModule} from "../carrito/carrito.module";
import {VideojuegoModule} from "../videojuego/videojuego.module";

@Module({
    imports: [
        // Repositorio
        TypeOrmModule
            .forFeature(
                [
                    UsuarioEntity
                ]
            ),
        RolesPorUsuarioModule,
        RolModule,
        VideojuegoModule,
        VentaModule,
        CarritoModule
    ],
    controllers: [
        UsuarioController
    ],
    providers: [
        UsuarioService
    ],
    exports: [
        UsuarioService
    ]
})
export class UsuarioModule {
}
