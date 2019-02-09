// usuario-crate.dto.ts

import {
    IsAlpha,
    IsDate,
    IsDateString,
    IsEmail,
    IsEmpty,
    IsNotEmpty,
    IsNumberString,
    IsString,
    Length,
    Matches
} from "class-validator";

export class UsuarioCreateDto {

    @IsNotEmpty({
        message: "NOMBRE: no puede dejar vacío"
    })
    @IsString()
    // @IsAlpha()
    @Length(3,50,{
        message: "NOMBRE: muy corto"
    })
    @Matches(/^[a-zA-Z\s]+$/,{
        message: "NOMBRE: Solo se permiten letras y espacios"
    })
    nombre:string;


    @IsNotEmpty({
        message: "PAIS: no puede dejar vacío"
    })
    @IsString()
    // @IsAlpha()
    @Length(3,50,{
        message: "PAIS: muy corto"
    })
    @Matches(/^[a-zA-Z\s]+$/,{
        message: "PAIS: Solo se permiten letras y espacios"
    })
    pais:string;

    @IsNotEmpty({
        message: "CORREO: no puede dejar vacío"
    })
    @IsString()
    @IsEmail({},{
        message: "CORREO: formato no válido"
    })
    correo:string;

    @IsNotEmpty({
        message: "PASSWORD: debe ingresar una contraseña"
    })
    @IsString()
    @Length(8,16,{
        message: "PASSWORD: debe tener al menos 8 caraceteres y máximo 17"
    })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,./:;<=>?@[^_`{|}~-])([A-Za-z\d!"#$%&'()*+,./:;<=>?@[^_`{|}~-]|[^ ]){8,16}$/,{
        message: "PASSWORD: debe contener al menos una minúscula, mayúscula, un número y un carácter especial."
    })
    password:string;
}