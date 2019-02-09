import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import {RolesPorUsuarioEntity} from "./rolesPorUsuario.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {Usuario,UsuarioService} from "../usuario/usuario.service";
import {RolEntity} from "../rol/rol.entity";


@Injectable()
export class RolesPorUsuarioService {

    constructor(
        @InjectRepository(RolesPorUsuarioEntity)
        private readonly _rolesPorUsuarioRepository: Repository<RolesPorUsuarioEntity>,
    ) {
    }

    async buscar(idUsuario: number): Promise<RolesPorUsuarioEntity[]> {
        return this._rolesPorUsuarioRepository.find(
            {
                relations: ["usuario","rol"],
                where: { usuario: idUsuario} }
        );
    }

    async buscarPorId(idRolPorUsuario: number): Promise<RolesPorUsuarioEntity> {
        return this._rolesPorUsuarioRepository.findOne(idRolPorUsuario);
    }

    borrar(idRolPorUsuario: number): Promise<RolesPorUsuarioEntity> {

        // CREA UNA INSTANCIA DE LA ENTIDAD
        const RolesPorUsuarioEntityAEliminar = this._rolesPorUsuarioRepository
            .create({
                id: idRolPorUsuario
            });


        return this._rolesPorUsuarioRepository.remove(RolesPorUsuarioEntityAEliminar);
    }

    async existeRolUsuario(nuevoRol: RolesPorUsuario): Promise<boolean>{
        const existe = this._rolesPorUsuarioRepository.count({where: {usuario:nuevoRol.usuario, rol:nuevoRol.rol}});
        return existe.then((n)=>{
            if(n>0){
                return true;
            }else{
                return false;
            }
        })

    }

    async crear(nuevoRol: RolesPorUsuario): Promise<RolesPorUsuarioEntity> {

        // Instanciar una entidad -> .create()

       // const existe = this._rolesPorUsuarioRepository.findAndCount({where:[rol=nuevoRol.rol, usuario=nuevoRol.usuario]})




        const rolPorUsuarioEntity = this._rolesPorUsuarioRepository
            .create(nuevoRol);


        // Guardar una entidad en la BDD -> .save()
        const rolCreado = await this._rolesPorUsuarioRepository
            .save(rolPorUsuarioEntity);

        return rolCreado;
    }

}




export interface RolesPorUsuario{
    id: number;
    usuario: UsuarioEntity;
    rol: RolEntity;
}