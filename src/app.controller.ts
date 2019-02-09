import {
    Get,
    Controller,
    Request,
    Response,
    Headers,
    HttpCode,
    HttpException,
    Query,
    Param,
    Res,
    Post, Body, Session, BadRequestException
} from '@nestjs/common';
import {Usuario, UsuarioService} from "./usuario/usuario.service";
import {RolesPorUsuarioService} from "./rolesPorUsuario/rolesPorUsuario.service";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {Like} from "typeorm";
import {VideojuegoEntity} from "./videojuego/videojuego.entity";
import {VideojuegoService} from "./videojuego/videojuego.service";

@Controller() // Decoradores!
export class AppController {

    // CONSTRUCTOR NO ES UN CONSTRUCTOR NORMAL!!!

    constructor(
        private readonly _usuarioService: UsuarioService,
        private readonly _videojuegoService: VideojuegoService,
        private readonly _rolesPorUsuarioService: RolesPorUsuarioService,
        // private readonly _appService:AppService,
    ) {

    }

    @Get('inicio')
    async inicio(
        @Res() response,
        @Query('busqueda') busqueda: string,
        @Session() sesion,
    ) {


        let mensaje; // undefined

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
        console.log("INICIO: "+ esUsuario+"....."+esAdministrador);

        if(sesion.esUsuario){

        }else{

        }

        response.render('inicio', {
            nombre: 'Rafael',
            arreglo: videojuegos,
            mensaje: mensaje,
            titulo: 'Gestion de usuarios',
            esUsuario: esUsuario,
            esAdministrador: esAdministrador
        });
    }


    @Post('login')
    @HttpCode(200)
    async loginMetodo(
        @Body('correo') correo: string,
        @Body('password') password: string,
        @Res() response,
        @Session() sesion
    ) {
        const identificado = await this._usuarioService
            .login(correo, password);

        if (identificado) {

            sesion.usuario = correo;
            sesion.usuarioEntidad = await this._usuarioService.encontrarUsuario(correo);

            const usuarioActual = await this._usuarioService.encontrarUsuario(correo);
            const idUsuarioActual = usuarioActual.id;
            const rolesActuales = await this._rolesPorUsuarioService.buscar(idUsuarioActual);
            const esAdministrador = rolesActuales.some(elemento=>elemento.rol.nombre === 'Administrador');
            const esUsuario = rolesActuales.some(elemento=>elemento.rol.nombre === 'Usuario');

            sesion.esUsuario=esUsuario;
            sesion.esAdministrador=esAdministrador;

            console.log("INICIO: "+ esUsuario+"....."+esAdministrador);
            // response.redirect('/saludar');
            //const parametrosConsulta = `?accion=crear&nombre=${usuario.nombre}`;
            response.redirect('/inicio');



        } else {

            response.render('login',{
                mensaje: "Fallo en login",
                titulo: "Iniciar sesion"
            });

            // throw new BadRequestException({mensaje: 'Error login'})
        }

    }

    @Get('login')
    loginVista(
        @Res() response

    ) {
        response.render('login');
    }

    @Get('logout')
    logout(
        @Res() response,
        @Session() sesion,
    ) {
        sesion.usuario = undefined;
        sesion.destroy();
        response.redirect('/inicio');

    }

    @Get('registrarse')
    registrarseVista(
        @Res() response
    ){

        const arregloPaises =  new Array("Afghanistan",
            "Albania",
            "Algeria",
            "Andorra",
            "Angola",
            "Antigua and Barbuda",
            "Argentina",
            "Armenia",
            "Australia",
            "Austria",
            "Azerbaijan",
            "Bahamas",
            "Bahrain",
            "Bangladesh",
            "Barbados",
            "Belarus",
            "Belgium",
            "Belize",
            "Benin",
            "Bhutan",
            "Bolivia",
            "Bosnia and Herzegovina",
            "Botswana",
            "Brazil",
            "Brunei",
            "Bulgaria",
            "Burkina Faso",
            "Burundi",
            "Cambodia",
            "Cameroon",
            "Canada",
            "Cape Verde",
            "Central African Republic",
            "Chad",
            "Chile",
            "China",
            "Colombia",
            "Comoros",
            "Congo (Brazzaville)",
            "Congo",
            "Costa Rica",
            "Cote d'Ivoire",
            "Croatia",
            "Cuba",
            "Cyprus",
            "Czech Republic",
            "Denmark",
            "Djibouti",
            "Dominica",
            "Dominican Republic",
            "East Timor (Timor Timur)",
            "Ecuador",
            "Egypt",
            "El Salvador",
            "Equatorial Guinea",
            "Eritrea",
            "Estonia",
            "Ethiopia",
            "Fiji",
            "Finland",
            "France",
            "Gabon",
            "Gambia, The",
            "Georgia",
            "Germany",
            "Ghana",
            "Greece",
            "Grenada",
            "Guatemala",
            "Guinea",
            "Guinea-Bissau",
            "Guyana",
            "Haiti",
            "Honduras",
            "Hungary",
            "Iceland",
            "India",
            "Indonesia",
            "Iran",
            "Iraq",
            "Ireland",
            "Israel",
            "Italy",
            "Jamaica",
            "Japan",
            "Jordan",
            "Kazakhstan",
            "Kenya",
            "Kiribati",
            "Korea, North",
            "Korea, South",
            "Kuwait",
            "Kyrgyzstan",
            "Laos",
            "Latvia",
            "Lebanon",
            "Lesotho",
            "Liberia",
            "Libya",
            "Liechtenstein",
            "Lithuania",
            "Luxembourg",
            "Macedonia",
            "Madagascar",
            "Malawi",
            "Malaysia",
            "Maldives",
            "Mali",
            "Malta",
            "Marshall Islands",
            "Mauritania",
            "Mauritius",
            "Mexico",
            "Micronesia",
            "Moldova",
            "Monaco",
            "Mongolia",
            "Morocco",
            "Mozambique",
            "Myanmar",
            "Namibia",
            "Nauru",
            "Nepa",
            "Netherlands",
            "New Zealand",
            "Nicaragua",
            "Niger",
            "Nigeria",
            "Norway",
            "Oman",
            "Pakistan",
            "Palau",
            "Panama",
            "Papua New Guinea",
            "Paraguay",
            "Peru",
            "Philippines",
            "Poland",
            "Portugal",
            "Qatar",
            "Romania",
            "Russia",
            "Rwanda",
            "Saint Kitts and Nevis",
            "Saint Lucia",
            "Saint Vincent",
            "Samoa",
            "San Marino",
            "Sao Tome and Principe",
            "Saudi Arabia",
            "Senegal",
            "Serbia and Montenegro",
            "Seychelles",
            "Sierra Leone",
            "Singapore",
            "Slovakia",
            "Slovenia",
            "Solomon Islands",
            "Somalia",
            "South Africa",
            "Spain",
            "Sri Lanka",
            "Sudan",
            "Suriname",
            "Swaziland",
            "Sweden",
            "Switzerland",
            "Syria",
            "Taiwan",
            "Tajikistan",
            "Tanzania",
            "Thailand",
            "Togo",
            "Tonga",
            "Trinidad and Tobago",
            "Tunisia",
            "Turkey",
            "Turkmenistan",
            "Tuvalu",
            "Uganda",
            "Ukraine",
            "United Arab Emirates",
            "United Kingdom",
            "United States",
            "Uruguay",
            "Uzbekistan",
            "Vanuatu",
            "Vatican City",
            "Venezuela",
            "Vietnam",
            "Yemen",
            "Zambia",
            "Zimbabwe");
        response.render('crear-usuario', {paises: arregloPaises});
    }



}