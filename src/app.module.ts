import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsuarioModule} from "./usuario/usuario.module";
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsuarioEntity} from "./usuario/usuario.entity";
import {RolesPorUsuarioEntity} from "./rolesPorUsuario/rolesPorUsuario.entity";
import {RolEntity} from "./rol/rol.entity";
import {RolesPorUsuarioModule} from "./rolesPorUsuario/rolesPorUsuario.module";
import {VentaEntity} from "./venta/venta.entity";
import {CarritoEntity} from "./carrito/carrito.entity";
import {VideojuegoEntity} from "./videojuego/videojuego.entity";
import {VideojuegoModule} from "./videojuego/videojuego.module";



@Module({
    imports: [
        TypeOrmModule
            .forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'rafael',
                password: 'rafael123',
                database: 'tiendaWeb',
                synchronize: false,
                dropSchema: false,
                entities: [
                    UsuarioEntity,
                    RolEntity,
                    RolesPorUsuarioEntity,
                    VentaEntity,
                    CarritoEntity,
                    VideojuegoEntity,

                ]
            }),
        UsuarioModule,
        RolesPorUsuarioModule,
        VideojuegoModule
    ], // Modulos
    controllers: [AppController], // Controllers
    providers: [
        AppService
    ], // Servicios
})
export class AppModule {
}
