// usuario.module.ts

import {Module} from "@nestjs/common";
import {RolService} from "./rol.service";
import {RolController} from "./rol.controller";
import {TypeOrmModule} from '@nestjs/typeorm';
import {RolEntity} from "./rol.entity";

@Module({
    imports: [
        // Repositorio
        TypeOrmModule
            .forFeature(
                [
                    RolEntity
                ]
            )
    ],
    controllers: [
        RolController
    ],
    providers: [
        RolService
    ],
    exports: [
        RolService
    ]
})
export class RolModule {
}
