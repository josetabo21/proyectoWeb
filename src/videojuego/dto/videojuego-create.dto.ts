// usuario-crate.dto.ts

import {
    IsAlpha,
    IsDate,
    IsDateString,
    IsEmail,
    IsEmpty,
    IsNotEmpty, IsNumber, IsNumberOptions,
    IsNumberString,
    IsString, IsUrl,
    Length,
    Matches
} from "class-validator";

export class VideojuegoCreateDto {

    @IsNotEmpty({
        message: "NOMBRE: no puede dejar vacío"
    })
    @IsString()
    // @IsAlpha()
    @Length(3,50,{
        message: "NOMBRE: muy corto"
    })
    @Matches(/^[0-9A-Za-zñáéíóúÑÁÉÍÓÚüÜ;\.:'\s\-",!¡¿?%&]+$/,{
        message: "NOMBRE: caracter especial no válido "
    })
    nombre:string;

    @IsNotEmpty({
        message: "DESCRIPCION: no puede dejar vacío"
    })
    @IsString()
    // @IsAlpha()
    @Length(3,50,{
        message: "DESCRIPCION: muy corto"
    })
    @Matches(/^[0-9A-Za-zñáéíóúÑÁÉÍÓÚüÜ;\.:'\s\-",.!¡¿?%&]+$/,{
        message: "DESCRIPCION: Solo se permiten letras y espacios"
    })
    descripcion:string;



    @IsNotEmpty({
        message: "PRECIO: no puede dejar vacío"
    })
    @IsNumber({},{
        message: "PRECIO: ingrese un valor numérico"
    })
    precio:number;

    @IsNotEmpty({
        message: "FECHA: debe ingresar una fecha"
    })
    @IsDate({
        message: "FECHA: debe ingresar una fecha válida"
    })
    fechaLanzamiento:Date;


    @IsNotEmpty({
        message: "GENERO: no puede dejar vacío"
    })
    @IsString()
    // @IsAlpha()
    @Length(3,50,{
        message: "GENERO: muy corto"
    })
    @Matches(/^[a-zA-Z\s]+$/,{
        message: "DESCRIPCION: Solo se permiten letras y espacios"
    })
    genero:string;

    @IsNotEmpty({
        message: "TRAILER: no puede dejar vacío"
    })
    @IsString()
    @IsUrl()
    trailer:string;


}