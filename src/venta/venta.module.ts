// usuario.module.ts

import {Module} from "@nestjs/common";
import {VentaService} from "./venta.service";
import {VentaController} from "./venta.controller";
import {TypeOrmModule} from '@nestjs/typeorm';
import {VentaEntity} from "./venta.entity";
import {CarritoModule} from "../carrito/carrito.module";




@Module({
    imports: [
        // Repositorio
        TypeOrmModule
            .forFeature(
                [
                    VentaEntity
                ]
            ),
        CarritoModule
    ],
    controllers: [
        VentaController
    ],
    providers: [
        VentaService
    ],
    exports: [
        VentaService
    ]
})
export class VentaModule {
}
