import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";

@Injectable ()
export class CategoriaService {

    constructor (
        @InjectRepository(Categoria)
        private CategoriaRepository: Repository<Categoria>
    ) {}

async findAll(): Promise<Categoria[]> {
    return await this.CategoriaRepository.find({
        relations: {
            produto: true
        }
    })
}

async findById (id: number): Promise<Categoria> {
    let categoria = await this.CategoriaRepository.findOne ({
        where: {
            id
        },

        relations: {
            produto: true
        }
    })

    if (!categoria)
    throw new HttpException ('Categoria não existe', HttpStatus.NOT_FOUND)
    return categoria

} 

async findByTipo (tipo: string): Promise<Categoria[]> {
    return await this.CategoriaRepository.find ({
        where: {
            tipo: ILike (`%${tipo}%`)
        },

        relations: {
            produto: true
        }
    })
}

async create(categoria: Categoria): Promise<Categoria> {
     return await this.CategoriaRepository.save(categoria)
}
    
async update(categoria: Categoria): Promise<Categoria> {
    let buscarCategoria = await this.findById(categoria.id)
        
    if (!buscarCategoria || !categoria.id)
    throw new HttpException('Categoria não existe', HttpStatus.NOT_FOUND)
    return await this.CategoriaRepository.save(categoria)
}

async delete (id: number): Promise<DeleteResult> {
     let buscarCategoria = await this.findById(id)
    
    if (!buscarCategoria)
        throw new HttpException ('Categoria não encontrada', HttpStatus.NOT_FOUND)
        return await this.CategoriaRepository.delete(id)
}
}
