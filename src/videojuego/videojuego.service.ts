import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import {VideojuegoEntity} from "./videojuego.entity";
import {RolesPorUsuario, RolesPorUsuarioService} from "../rolesPorUsuario/rolesPorUsuario.service";
import {FindManyOptions} from "../../node_modules/typeorm/find-options/FindManyOptions";
import {RolesPorUsuarioEntity} from "../rolesPorUsuario/rolesPorUsuario.entity";


@Injectable()
export class VideojuegoService {
    // Inyectar Dependencias
    constructor(
        @InjectRepository(VideojuegoEntity)
        private readonly _videojuegoRepository: Repository<VideojuegoEntity>,
    ) {
    }

    buscar(parametros?: FindManyOptions<VideojuegoEntity>)
        : Promise<VideojuegoEntity[]> {
        return this._videojuegoRepository.find(parametros);
    }


    async crear(nuevoVideojuego: Videojuego): Promise<VideojuegoEntity> {

        // Instanciar una entidad -> .create()


        const videojuegoEntity = this._videojuegoRepository
            .create(nuevoVideojuego);

        // Guardar una entidad en la BDD -> .save()
        const videojuegoCreado = await this._videojuegoRepository
            .save(videojuegoEntity);

        return videojuegoCreado;
    }

    actualizar(idVideojuego: number,
               nuevoVideojuego: Videojuego): Promise<VideojuegoEntity> {

        nuevoVideojuego.id = idVideojuego;

        const videojuegoEntity = this._videojuegoRepository.create(nuevoVideojuego);

        return this._videojuegoRepository.save(videojuegoEntity);
    }

    borrar(idVideojuego: number): Promise<VideojuegoEntity> {

        // CREA UNA INSTANCIA DE LA ENTIDAD
        const videojuegoEntityAEliminar = this._videojuegoRepository
            .create({
                id: idVideojuego
            });


        return this._videojuegoRepository.remove(videojuegoEntityAEliminar)
    }

    buscarPorId(idVideojuego: number): Promise<VideojuegoEntity> {
        return this._videojuegoRepository.findOne(idVideojuego);
    }

}



export interface Videojuego{
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    fechaLanzamiento: Date;
    genero: string,
    trailer: string
}