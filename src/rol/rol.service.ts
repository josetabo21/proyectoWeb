import {Injectable} from "@nestjs/common";
import {Repository,createQueryBuilder} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import {RolEntity} from "./rol.entity";
import {FindManyOptions} from "../../node_modules/typeorm/find-options/FindManyOptions";
import {RolesPorUsuarioEntity} from "../rolesPorUsuario/rolesPorUsuario.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";


@Injectable()
export class RolService {
    constructor(
        @InjectRepository(RolEntity)
        private readonly _rolRepository: Repository<RolEntity>,
    ) {
    }

    async buscar(parametros?: FindManyOptions<RolEntity>): Promise<RolEntity[]> {
        return this._rolRepository.find(parametros);
    }

    async buscarPorId(idRol: number): Promise<RolEntity> {
        return this._rolRepository.findOne(idRol);
    }

}




export interface Rol {
    id: number;
    nombre: string;
}