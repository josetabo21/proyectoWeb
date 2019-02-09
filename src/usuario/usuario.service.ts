import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import {UsuarioEntity} from "./usuario.entity";
import {RolesPorUsuario, RolesPorUsuarioService} from "../rolesPorUsuario/rolesPorUsuario.service";
import {FindManyOptions} from "../../node_modules/typeorm/find-options/FindManyOptions";
import {RolesPorUsuarioEntity} from "../rolesPorUsuario/rolesPorUsuario.entity";


@Injectable()
export class UsuarioService {
    // Inyectar Dependencias
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly _usuarioRepository: Repository<UsuarioEntity>,
    ) {
    }

    buscar(parametros?: FindManyOptions<UsuarioEntity>)
        : Promise<UsuarioEntity[]> {
        return this._usuarioRepository.find(parametros);
    }


    async crear(nuevoUsuario: Usuario): Promise<UsuarioEntity> {

        // Instanciar una entidad -> .create()


        const usuarioEntity = this._usuarioRepository
            .create(nuevoUsuario);

        // Guardar una entidad en la BDD -> .save()
        const usuarioCreado = await this._usuarioRepository
            .save(usuarioEntity);

        return usuarioCreado;
    }

    actualizar(idUsuario: number,
               nuevoUsuario: Usuario): Promise<UsuarioEntity> {

        nuevoUsuario.id = idUsuario;

        const usuarioEntity = this._usuarioRepository.create(nuevoUsuario);

        return this._usuarioRepository.save(usuarioEntity);
    }

    borrar(idUsuario: number): Promise<UsuarioEntity> {

        // CREA UNA INSTANCIA DE LA ENTIDAD
        const usuarioEntityAEliminar = this._usuarioRepository
            .create({
                id: idUsuario
            });


        return this._usuarioRepository.remove(usuarioEntityAEliminar)
    }

    buscarPorId(idUsuario: number): Promise<UsuarioEntity> {
        return this._usuarioRepository.findOne(idUsuario);
    }


    async login(correo: string, password: string)
        : Promise<boolean> {
        // 1) Buscar al usuario por username
        // 2) Comparar si el password es igual al password

        const usuarioEncontrado = await this._usuarioRepository
            .findOne({
                where: {
                    correo: correo
                }
            });
        if (usuarioEncontrado) {

            if (usuarioEncontrado.password === password) {
                return true;
            } else {
                return false;
            }

        } else {
            return false;
        }


    }

    async encontrarUsuario (correo:string): Promise<UsuarioEntity>{
        return this._usuarioRepository.findOne({where: {correo: correo} });
    }

}



export interface Usuario {
    id: number;
    nombre: string;
    pais: string;
    correo: string;
    password: string;
}