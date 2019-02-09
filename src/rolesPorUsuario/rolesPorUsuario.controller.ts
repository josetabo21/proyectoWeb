// usuario.controller.ts
import {BadRequestException, Body, Controller, Get, HttpCode, Param, Post, Query, Res, Session} from "@nestjs/common";
import {RolesPorUsuario, RolesPorUsuarioService} from "./rolesPorUsuario.service";
import {RolesPorUsuarioEntity} from "./rolesPorUsuario.entity";
import {Like} from "typeorm";
import {validate, ValidationError} from "class-validator";
import {UsuarioService} from "../usuario/usuario.service";
import {RolService} from "../rol/rol.service";

@Controller('RolesPorUsuario')
export class RolesPorUsuarioController {

    constructor(
        private readonly _rolesPorUsuarioService: RolesPorUsuarioService,
    ) {

    }

    @Post('borrar/:idRolPorUsuario/:idUsuario')
    async borrar(
        @Param('idRolPorUsuario') idRolPorUsuario: string,
        @Param('idUsuario') idUsuario: string,
        @Res() response,
        @Session() sesion
    ) {
        const rolEncontrado = await this._rolesPorUsuarioService
            .buscarPorId(+idRolPorUsuario);



        await this._rolesPorUsuarioService.borrar(Number(idRolPorUsuario));

        const rolesUsuario = await this._rolesPorUsuarioService.buscar(Number(idUsuario));

        const esAdministrador = rolesUsuario.some(elemento=>elemento.rol.nombre === 'Administrador');
        const esUsuario = rolesUsuario.some(elemento=>elemento.rol.nombre === 'Usuario');

        sesion.esUsuario=esUsuario;
        sesion.esAdministrador=esAdministrador;

        console.log("BORRAR:"+sesion.esUsuario+"......."+sesion.esAdministrador);

        const parametrosConsulta = idUsuario;
        response.redirect('/Usuario/actualizar-usuario/' + parametrosConsulta);
    }



}

