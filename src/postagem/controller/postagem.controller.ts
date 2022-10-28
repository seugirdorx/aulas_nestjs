import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { PostagemService } from "../service/postagem.service";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult } from "typeorm";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller ('/postagens')
export class PostagemController {

    constructor (private readonly PostagemService: PostagemService) {}

    @Get ()
    @HttpCode (HttpStatus.OK)
    findAll(): Promise<Postagem[]> {
        return this.PostagemService.findAll();
    }

    @Get ('/:id')
    @HttpCode (HttpStatus.OK)
    findById (@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
        return this.PostagemService.findById(id)
    }

    @Get ('/descricao/:descricao')
    @HttpCode (HttpStatus.OK)
    findByDescricao (@Param('descricao') descricao: string): Promise<Postagem[]> {
        return this.PostagemService.findByDescricao(descricao)
    }

    @Post ()
    @HttpCode (HttpStatus.CREATED)
    create(@Body() postagem: Postagem): Promise<Postagem> {
        return this.PostagemService.create(postagem)
    }

    @Put ()
    @HttpCode (HttpStatus.OK)
    update (@Body() postagem: Postagem): Promise<Postagem> {
        return this.PostagemService.update(postagem)
    }

    @Delete ('/:id')
    @HttpCode (HttpStatus.NO_CONTENT)
    delete (@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.PostagemService.delete(id)
    }
}
