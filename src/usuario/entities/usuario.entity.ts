import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";

@Entity ({name: "tb_usuario"})
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @MaxLength(255)
    @Column ({length: 255, nullable: false})
    nome: string

    @IsEmail()
    @MaxLength(255)
    @Column ({length: 255, nullable: false})
    usuario: string

    @IsNotEmpty()
    @MinLength(8)
    @Column ({length: 255, nullable: false})
    senha: string

    @MaxLength (5000)
    @Column ({length: 5000})
    foto: string

    @OneToMany(() => Postagem, (postagem) => postagem.usuario)
    postagem: Postagem

}