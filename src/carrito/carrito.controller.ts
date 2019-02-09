import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import { CarritoService} from "./carrito.service";
import {CarritoEntity} from "./carrito.entity";



@Controller('Carrito')
export class CarritoController {

    constructor(
        private readonly _carritoService: CarritoService,
    ) {

    }


    @Get('items')
    async misItems(
        @Res() response,
        @Session() sesion,
    ) {


        let carrito: CarritoEntity[];

        carrito = await this._carritoService.buscar();

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

    @Get('biblioteca')
    async miBiblioteca(
        @Res() response,
        @Session() sesion,
    ) {

        if(typeof sesion.usuarioEntidad !== 'undefined'){
            let carrito: CarritoEntity[];

            carrito = await this._carritoService.buscarBiblioteca(sesion.usuarioEntidad.id);

            console.log("AQUI ", carrito);

            let esUsuario = sesion.esUsuario;
            let esAdministrador = sesion.esAdministrador;
            // console.log("INICIO: "+ esUsuario+"....."+esAdministrador);

            response.render('biblioteca', {
                nombre: 'Rafael',
                carrito: carrito,
                titulo: 'Carrito de compra',
                esUsuario: esUsuario,
                esAdministrador: esAdministrador
            });
        }else{
            response.render('biblioteca', {
                nombre: 'Rafael',
                titulo: 'bilioteca',
            });
        }


    }



    @Post('borrar/:idCarrito')
    async borrar(
        @Param('idCarrito') idCarrito: string,
        @Res() response,
        @Session() sesion
    ) {
        const rolEncontrado = await this._carritoService
            .buscarPorId(+idCarrito);



        await this._carritoService.borrar(Number(idCarrito));

        console.log("BORRAR:"+sesion.esUsuario+"......."+sesion.esAdministrador);

        response.redirect('/Carrito/items/');
    }
}
