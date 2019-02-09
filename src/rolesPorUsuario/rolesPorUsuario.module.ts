// usuario.module.ts

import {Module} from "@nestjs/common";
import {RolesPorUsuarioService} from "./rolesPorUsuario.service";
import {RolesPorUsuarioController} from "./rolesPorUsuario.controller";
import {TypeOrmModule} from '@nestjs/typeorm';
import {RolesPorUsuarioEntity} from "./rolesPorUsuario.entity";
import {RolModule} from "../rol/rol.module";


@Module({
    imports: [
        // Repositorio
        TypeOrmModule
            .forFeature(
                [
                    RolesPorUsuarioEntity
                ]
            ),
        RolModule
    ],
    controllers: [
        RolesPorUsuarioController
    ],
    providers: [
        RolesPorUsuarioService
    ],
    exports: [
        RolesPorUsuarioService
    ]
})
export class RolesPorUsuarioModule {
}
