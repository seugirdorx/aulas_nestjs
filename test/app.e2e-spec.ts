import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm'

describe('Teste de Módulos Usuarios e Auth (e2e)', () => {

  let token: any;
  let usuarioId: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'db_blogpessoaltest',
        autoLoadEntities: true,
        synchronize: true,
        logging: false,
        dropSchema: true
      }),
      AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async() => {
    await app.close()
  })

  it('01 - Deve Cadastrar Usuario', async () => {
    const resposta = await request (app.getHttpServer())
    .post('/usuarios/cadastrar')
    .send({
      nome: 'Amanda',
      usuario: 'olhameuemail@quebonito.com',
      senha: 'esqueciminhasenha',
      foto: ''
    });
    expect (201)
      usuarioId = resposta.body.id 
  })

  it('02 - Deve Autentificar Usuario (Login)', async () => {
    const resposta = await request (app.getHttpServer())
    .post('/auth/logar')
    .send({
      usuario: 'olhameuemail@quebonito.com',
      senha: 'esqueciminhasenha'
    })
    expect (200)
    token = resposta.body.token
  })

  it ('03 - Não Deve Duplicar o Usuario', async () => {
    return request (app.getHttpServer())
    .post('/usuarios/cadastrar')
    .send({
      nome: 'Amanda',
      usuario: 'olhameuemail@quebonito.com',
      senha: 'esqueciminhasenha',
      foto: ''
    })
    expect (400)
  })

  it ('04 - Deve Listar Todos os Usuarios', async () => {
    return request (app.getHttpServer())
    .get('/usuarios/all')
    .set('Authorization', `${token}`)
    .send({})
    expect(200)
  })

  it ('05 - Deve Atualizar um Usuario', async () => {
    return request (app.getHttpServer())
    .put('/usuarios/atualizar')
    .set('Authorization', `${token}`)
    .send({
      id: usuarioId,
      nome: 'Amandinha',
      usuario: 'olhameuemail@quebonito.com',
      senha: 'esqueciminhasenha',
      foto: ''
    })
    .expect (200)
    .then(resposta => {
      expect("Amandinha").toEqual(resposta.body.nome)
    })
  })
});
