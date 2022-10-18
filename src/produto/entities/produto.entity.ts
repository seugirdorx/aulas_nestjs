import { IsNotEmpty } from "class-validator";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity ({name: "tb_produto"})
export class Produto{

    @PrimaryGeneratedColumn ()
    id: number

    @IsNotEmpty ()
    @Column ({ length: 50, nullable: false})
    nome: string

    @IsNotEmpty ()
    @Column ({ type: 'decimal', precision: 5, scale: 2, default: 0, nullable: false})
    preco: number

    @IsNotEmpty ()
    @Column ({length: 50, nullable: false})
    faixa_etaria: string

    @ManyToOne (() => Categoria, (Categoria) => Categoria.produto)
    categoria: Categoria []
}