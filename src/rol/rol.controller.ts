// usuario.controller.ts
import {Body, Controller, Get, Param, Post, Query, Res} from "@nestjs/common";
import {Rol, RolService} from "./rol.service";
import {RolEntity} from "./rol.entity";
import {Like} from "typeorm";
import {validate, ValidationError} from "class-validator";

@Controller('Rol')
export class RolController {

    constructor(
        private readonly _rolService: RolService,
    ) {

    }




}

