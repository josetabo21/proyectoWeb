// usuario.controller.ts
import {BadRequestException, Body, Controller, Get, HttpCode, Param, Post, Query, Res, Session} from "@nestjs/common";
import {Usuario, UsuarioService} from "./usuario.service";
import {UsuarioEntity} from "./usuario.entity";
import {Like} from "typeorm";
import {UsuarioCreateDto} from "./dto/usuario-create.dto";
import {validate, ValidationError} from "class-validator";
import {RolesPorUsuarioService} from "../rolesPorUsuario/rolesPorUsuario.service";
import {RolService} from "../rol/rol.service";
import {VideojuegoService} from "../videojuego/videojuego.service";
import {VentaService} from "../venta/venta.service";
import {CarritoService} from "../carrito/carrito.service";

@Controller('Usuario')
export class UsuarioController {

    constructor(
        private readonly _usuarioService: UsuarioService,
        private readonly _rolesPorUsuarioService: RolesPorUsuarioService,
        private readonly _rolService: RolService,
        private readonly _videojuegoService: VideojuegoService,
        private readonly _ventaService: VentaService,
        private readonly _carritoService: CarritoService
    ) {

    }


    @Get('inicio')
    async inicio(
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

        let usuarios: UsuarioEntity[];
        if (busqueda) {

            const consulta = {
                where: [
                    {
                        nombre: Like(`%${busqueda}%`)
                    },
                    {
                        correo: Like(`%${busqueda}%`)
                    }
                ]
            };
            usuarios = await this._usuarioService.buscar(consulta);
        } else {
            usuarios = await this._usuarioService.buscar();
        }


        let esUsuario = sesion.esUsuario;
        let esAdministrador = sesion.esAdministrador;
       // console.log("INICIO: "+ esUsuario+"....."+esAdministrador);

        response.render('gestionUsuarios', {
            nombre: 'Rafael',
            arreglo: usuarios,
            mensaje: mensaje,
            accion: clase,
            titulo: 'Gestion de usuarios',
            esUsuario: esUsuario,
            esAdministrador: esAdministrador
        });
    }

    @Post('borrar/:idUsuario')
    async borrar(
        @Param('idUsuario') idUsuario: string,
        @Res() response,
        @Session() sesion
    ) {
        const usuarioEncontrado = await this._usuarioService
            .buscarPorId(+idUsuario);

        await this._usuarioService.borrar(Number(idUsuario));

        const parametrosConsulta = `?accion=borrar&nombre=${usuarioEncontrado.nombre}`;

        response.redirect('/Usuario/inicio' + parametrosConsulta);
    }

    @Get('crear-usuario')
    crearUsuario(
        @Res() response,
        @Session () sesion
    ) {
        response.render(
            'crear-usuario',{
                esUsuario: sesion.esUsuario,
                esAdministrador: sesion.esAdministrador
            }
        )
    }

    @Get('actualizar-usuario/:idUsuario')
    async actualizarUsuario(
        @Param('idUsuario') idUsuario: string,
        @Res() response,
        @Session() sesion

    ) {
        const usuarioAActualizar = await this
            ._usuarioService
            .buscarPorId(Number(idUsuario));
        const rolesUsuario = await this._rolesPorUsuarioService.buscar(Number(idUsuario));
        console.log(rolesUsuario);
        const roles = await this._rolService.buscar();
        console.log("ACTUALIZAR:"+sesion.esUsuario+"......."+sesion.esAdministrador);


        response.render(
            'actualizar', {
                usuario: usuarioAActualizar,
                rolesUsuario: rolesUsuario,
                allRoles: roles,
                esUsuario: sesion.esUsuario,
                esAdministrador: sesion.esAdministrador
            }
        )
    }



    @Post('crear-usuario')
    async crearUsuarioFormulario(
        @Body() usuario: Usuario,
        @Res() response
    ) {
        const usuarioValidado = new UsuarioCreateDto();

        usuarioValidado.nombre = usuario.nombre;
        usuarioValidado.correo = usuario.correo;
        usuarioValidado.pais = usuario.pais;
        usuarioValidado.password = usuario.password;

        const errores: ValidationError[] = await validate(usuarioValidado);

        console.log(usuario.id);

        const hayErrores = errores.length > 0;

        let mensaje = '';

        if(hayErrores){

            console.error(errores);

            errores.forEach((error)=>{
                mensaje=mensaje+"\n"+JSON.stringify(error.constraints);
            })

            response.render(
                'crear-usuario',{mensaje:mensaje}
            )

        }else{
            try {
                await this._usuarioService.crear(usuario);
                let usuarioEntidad = await this._usuarioService.encontrarUsuario(usuario.correo);
                let rol = await  this._rolService.buscarPorId(2);
                await this._rolesPorUsuarioService.crear({id:undefined, usuario:usuarioEntidad,rol:rol});
                response.redirect('/login');
            }catch(err){

                response.render(
                    'crear-usuario',{mensaje:"correo ya registrado"}
                )
            }

        }



    }

    @Get(':id')
    obtenerPorId(
        @Param('id') idUsuario
    ){
        console.log(idUsuario);
        return this._usuarioService.buscarPorId(+idUsuario);
    }



    @Post('agregar/:idUsuario')
    @HttpCode(200)
    async agregarMetodo(
        @Param('idUsuario') idUsuario: string,
        @Body('idRol') idRol: string,
        @Res() response,
        @Session() sesion
    ) {

        console.log("AQUI", idUsuario+""+idRol )

        let usuario = await this._usuarioService.buscarPorId(Number(idUsuario));
        let rol = await  this._rolService.buscarPorId(Number(idRol));

        let existe = await this._rolesPorUsuarioService.existeRolUsuario({id:undefined, usuario:usuario,rol:rol});
        const parametrosConsulta = `${idUsuario}`;

        if(!existe){
            await this._rolesPorUsuarioService.crear({id:undefined, usuario:usuario,rol:rol});

            const rolesUsuario = await this._rolesPorUsuarioService.buscar(Number(idUsuario));
            const esActualAdministrador = rolesUsuario.some(elemento=>elemento.rol.nombre === 'Administrador');
            const esActualUsuario = rolesUsuario.some(elemento=>elemento.rol.nombre === 'Usuario');

            sesion.esUsuario=esActualUsuario;
            sesion.esAdministrador=esActualAdministrador;



            response.redirect('/Usuario/actualizar-usuario/' + parametrosConsulta);

        }else{
            const usuarioAActualizar = await this
                ._usuarioService
                .buscarPorId(Number(idUsuario));
            const rolesUsuario = await this._rolesPorUsuarioService.buscar(Number(idUsuario));

            const roles = await this._rolService.buscar();


            response.render(
                'actualizar', {
                    usuario: usuarioAActualizar,
                    rolesUsuario: rolesUsuario,
                    allRoles: roles,
                    mensaje: "Ese usuario ya tiene ese rol",
                }
            )
        }


    }


    @Post('agregarCarrito/:idVideojuego')
    @HttpCode(200)
    async agregarCarritoMetodo(
        @Param('idVideojuego') idVideojuego: string,
        @Res() response,
        @Session() sesion
    ) {


        let videojuego = await this._videojuegoService.buscarPorId(Number(idVideojuego));
        let usuario = sesion.usuario;
 //       let fecha =new Date();
//        let ventaPendiente = await this._ventaService.crear({id: undefined, fechaVenta: fecha,usuario: usuario})
        let carrito = await this._carritoService.crear({id: undefined, venta: undefined, videojuego: videojuego });

            response.redirect('/inicio');



    }
}


