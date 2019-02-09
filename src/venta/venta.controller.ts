import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {Venta, VentaService} from "./venta.service";
import {VentaEntity} from "./venta.entity";
import {Like} from "typeorm";
import {validate, ValidationError} from "class-validator";
import {VentaCreateDto} from "./dto/entrenador-create.dto";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {CarritoEntity} from "../carrito/carrito.entity";
import {CarritoService} from "../carrito/carrito.service";

@Controller('Venta')
export class VentaController {

    constructor(
        private readonly _ventaService: VentaService,
        private readonly _carritoService: CarritoService
    ) {

    }
    @Get('confirmarVenta')
    async misItems(
        @Res() response,
        @Session() sesion,
    ) {


        let carrito: CarritoEntity[];
        let nuevaVenta = await this._ventaService.crear({id:undefined, usuario:sesion.usuarioEntidad, fechaVenta: new Date()});
        carrito = await this._carritoService.buscar();

        carrito.forEach((car)=>{
            car.venta=nuevaVenta;
            this._carritoService.confirmarVenta(car);
        })

        let esUsuario = sesion.esUsuario;
        let esAdministrador = sesion.esAdministrador;
        // console.log("INICIO: "+ esUsuario+"....."+esAdministrador);

        response.render('carrito', {
            nombre: 'Rafael',
            carrito: carrito,
            titulo: 'Carrito de compra',
            esUsuario: esUsuario,
            esAdministrador: esAdministrador
        });
    }

}

