// usuario-crate.dto.ts

import {
    IsAlpha, IsBoolean,
    IsDate,
    IsDateString,
    IsEmail,
    IsEmpty, IsInt,
    IsNotEmpty,
    IsNumber,
    IsString,
    Length,
    Matches, Min
} from "class-validator";

export class VentaCreateDto {

    @IsNotEmpty({
        message: "FECHA: debe ingresar una fecha"
    })
    @IsDate({
        message: "FECHA: debe ingresar una fecha válida"
    })
    fechaVenta:Date;

}