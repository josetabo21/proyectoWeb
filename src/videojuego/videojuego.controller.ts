// usuario.controller.ts
import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {Videojuego, VideojuegoService} from "./videojuego.service";
import {VideojuegoEntity} from "./videojuego.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {Like} from "typeorm";
import {Usuario} from "../usuario/usuario.service";
import {UsuarioCreateDto} from "../usuario/dto/usuario-create.dto";
import {validate, ValidationError} from "class-validator";
import {VideojuegoCreateDto} from "./dto/videojuego-create.dto";


@Controller('Videojuego')
export class VideojuegoController {

    constructor(
        private readonly _videojuegoService: VideojuegoService,
    ) {

    }



    @Get('admin')
    async admin(
        @Res() response,
        @Query('accion') accion: string,
        @Query('nombre') nombre: string,
        @Query('busqueda') busqueda: string,
        @Session() sesion,
    ) {


        let mensaje; // undefined
        let clase; // undefined

        if (accion && nombre) {
            switch (accion) {
                case 'actualizar':
                    clase = 'info';
                    mensaje = `Registro ${nombre} actualizado`;
                    break;
                case 'borrar':
                    clase = 'danger';
                    mensaje = `Registro ${nombre} eliminado`;
                    break;
                case 'crear':
                    clase = 'success';
                    mensaje = `Registro ${nombre} creado`;
                    break;
            }
        }

        let videojuegos: VideojuegoEntity[];
        if (busqueda) {

            const consulta = {
                where: [
                    {
                        nombre: Like(`%${busqueda}%`)
                    }
                ]
            };
            videojuegos = await this._videojuegoService.buscar(consulta);
        } else {
            videojuegos = await this._videojuegoService.buscar();
        }


        let esUsuario = sesion.esUsuario;
        let esAdministrador = sesion.esAdministrador;
        // console.log("INICIO: "+ esUsuario+"....."+esAdministrador);

        response.render('gestionJuegos', {
            nombre: 'Rafael',
            arreglo: videojuegos,
            mensaje: mensaje,
            accion: clase,
            titulo: 'Gestion de juegos',
            esUsuario: esUsuario,
            esAdministrador: esAdministrador
        });
    }

    @Get('detalle/:idVideojuego')
    async detalle(
        @Res() response,
        @Param('idVideojuego') idVideojuego: string,
        @Session() sesion
    ){

        let videojuego = await this._videojuegoService.buscarPorId(Number(idVideojuego));
        let esUsuario = sesion.esUsuario;
        let esAdministrador = sesion.esAdministrador;
        let titulo = videojuego.nombre;
        response.render('detalleVideojuego',{
            videojuego: videojuego,
            titulo: titulo,
            esUsuario: esUsuario,
            esAdministrador: esAdministrador
        })


    }


    @Post('borrar/:idJuego')
    async borrar(
        @Param('idJuego') idJuego: string,
        @Res() response,
        @Session() sesion
    ) {
        const videojuegoEncontrado = await this._videojuegoService
            .buscarPorId(+idJuego);

        await this._videojuegoService.borrar(Number(idJuego));

        response.redirect('/Videojuego/admin');
    }


    @Post('actualizar/:idVideojuego')
    async actualizarVideojuegoFormulario(
        @Body() videojuego: Videojuego,
        @Param('idVideojuego') idVideojuego: string,
        @Res() response,
        @Session() sesion
    ) {
        const videojuegoValidado = new VideojuegoCreateDto();

        videojuegoValidado.nombre = videojuego.nombre;
        videojuegoValidado.descripcion = videojuego.descripcion;
        videojuegoValidado.precio = Number(videojuego.precio);
        videojuegoValidado.fechaLanzamiento = new Date(videojuego.fechaLanzamiento);
        videojuegoValidado.genero = videojuego.genero;
        videojuegoValidado.trailer = videojuego.trailer;

        const errores: ValidationError[] = await validate(videojuegoValidado);

        console.log(videojuego.id);

        const hayErrores = errores.length > 0;

        let mensaje = '';

        if(hayErrores){

            console.error(errores);

            errores.forEach((error)=>{
                mensaje=mensaje+"\n"+JSON.stringify(error.constraints);
            })

            let videojuegos = await this._videojuegoService.buscar();
            let esUsuario = sesion.esUsuario;
            let esAdministrador = sesion.esAdministrador;

            response.render('gestionJuegos', {
                nombre: 'Rafael',
                arreglo: videojuegos,
                mensaje: mensaje,
                titulo: 'Gestion de juegos',
                esUsuario: esUsuario,
                esAdministrador: esAdministrador
            });

        }else{

            await this._videojuegoService.actualizar(Number(idVideojuego), videojuego);
            response.redirect('/Videojuego/admin');


        }

    }


    @Post('crear')
    async crearUsuarioFormulario(
        @Body() videojuego: Videojuego,
        @Res() response,
        @Session() sesion
    ) {
        const videojuegoValidado = new VideojuegoCreateDto();

        videojuegoValidado.nombre = videojuego.nombre;
        videojuegoValidado.descripcion = videojuego.descripcion;
        videojuegoValidado.precio = Number(videojuego.precio);
        videojuegoValidado.fechaLanzamiento = new Date(videojuego.fechaLanzamiento);
        videojuegoValidado.genero = videojuego.genero;
        videojuegoValidado.trailer = videojuego.trailer;

        const errores: ValidationError[] = await validate(videojuegoValidado);

        console.log(videojuego.id);

        const hayErrores = errores.length > 0;

        let mensaje = '';

        if(hayErrores){

            console.error(errores);

            errores.forEach((error)=>{
                mensaje=mensaje+"\n"+JSON.stringify(error.constraints);
            })

            let videojuegos = await this._videojuegoService.buscar();
            let esUsuario = sesion.esUsuario;
            let esAdministrador = sesion.esAdministrador;

            response.render('gestionJuegos', {
                nombre: 'Rafael',
                arreglo: videojuegos,
                mensaje: mensaje,
                titulo: 'Gestion de juegos',
                esUsuario: esUsuario,
                esAdministrador: esAdministrador
            });

        }else{

                await this._videojuegoService.crear(videojuego);
                response.redirect('/Videojuego/admin');


        }

    }




}
