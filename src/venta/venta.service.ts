import {Body, Injectable, Post, Res} from "@nestjs/common";
import {Repository,createQueryBuilder} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import {VentaEntity} from "./venta.entity";
import {FindManyOptions} from "../../node_modules/typeorm/find-options/FindManyOptions";
import {RolesPorUsuarioEntity} from "../rolesPorUsuario/rolesPorUsuario.entity";
import {Usuario} from "../usuario/usuario.service";
import {validate, ValidationError} from "class-validator";
import {UsuarioEntity} from "../usuario/usuario.entity";


@Injectable()
export class VentaService {
    constructor(
        @InjectRepository(VentaEntity)
        private readonly _ventaRepository: Repository<VentaEntity>,
    ) {
    }

     buscar(parametros?: FindManyOptions<VentaEntity>): Promise<VentaEntity[]> {
        return this._ventaRepository.find(parametros);
    }

    async buscarPorId(idEntrenador: number): Promise<VentaEntity> {
        return this._ventaRepository.findOne(idEntrenador);
    }


    async crear(nuevaVenta: Venta): Promise<VentaEntity> {

        // Instanciar una entidad -> .create()


        const ventaEntity = this._ventaRepository
            .create(nuevaVenta);

        // Guardar una entidad en la BDD -> .save()
        const ventaCreado = await this._ventaRepository
            .save(ventaEntity);

        return ventaCreado;
    }

    async existeCampeon (): Promise<boolean>{

        const existe = this._ventaRepository.count({where: {campeonActual: true} });
        return existe.then((n)=>{
            if(n>0){
                return true;
            }else{
                return false;
            }
        })
    }

}



export interface Venta {
    id: number;
    fechaVenta: Date;
    usuario: UsuarioEntity
}
