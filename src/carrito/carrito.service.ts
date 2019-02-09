import {Injectable} from "@nestjs/common";
import {Repository, createQueryBuilder, IsNull} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import {CarritoEntity} from "./carrito.entity";
import {VentaEntity} from "../venta/venta.entity";
import {VideojuegoEntity} from "../videojuego/videojuego.entity";
import {RolesPorUsuarioEntity} from "../rolesPorUsuario/rolesPorUsuario.entity";
import {RolesPorUsuario} from "../rolesPorUsuario/rolesPorUsuario.service";
import {Videojuego} from "../videojuego/videojuego.service";



@Injectable()
export class CarritoService {
    constructor(
        @InjectRepository(CarritoEntity)
        private readonly _carritoRepository: Repository<CarritoEntity>,
    ) {
    }

    async crear(nuevoCarrito: CarritoEntity): Promise<CarritoEntity> {

        // Instanciar una entidad -> .create()

        // const existe = this._rolesPorUsuarioRepository.findAndCount({where:[rol=nuevoRol.rol, usuario=nuevoRol.usuario]})
        const carritoEntity = this._carritoRepository
            .create(nuevoCarrito);


        // Guardar una entidad en la BDD -> .save()
        const carritoCreado = await this._carritoRepository
            .save(carritoEntity);

        return carritoCreado;
    }

    confirmarVenta(carrito: CarritoEntity) {


            const carritoEntity = this._carritoRepository.create(carrito);
            this._carritoRepository.save(carritoEntity);
    }

    async buscar(): Promise<CarritoEntity[]> {
        return this._carritoRepository.find(
            {
                relations: ["venta","videojuego"],
                where: { venta: IsNull()} }
        );
    }

    async buscarBiblioteca(idUsuario: number): Promise<CarritoEntity[]> {
        return this._carritoRepository.find(
            {
                relations: ["venta","videojuego"],
                where: { "venta.usuario": idUsuario} }
        );
    }

    borrar(idCarrito: number): Promise<CarritoEntity> {

        // CREA UNA INSTANCIA DE LA ENTIDAD
        const carritoEntityAEliminar = this._carritoRepository
            .create({
                id: idCarrito
            });


        return this._carritoRepository.remove(carritoEntityAEliminar);
    }
    async buscarPorId(idCarrito: number): Promise<CarritoEntity> {
        return this._carritoRepository.findOne(idCarrito);
    }



}



export interface Carrito {
    id: number;
    venta: VentaEntity,
    videojuego: VideojuegoEntity;
}
