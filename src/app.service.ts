import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getListaBSMs(): string {
    return 'MENTALIDADES: <br> 1 - Responsabilidade Pessoal <br> 2 - Mentalidade de Crescimento <br> 3 - Orientação ao Futuro <br> 4 - Persistência <br> <br> HABILIDADES COMPORTAMENTAIS: <br> 1 - Comunicação <br> 2 - Trabalho em Equipe <br> 3 - Atenção para Detalhes <br> 4 - Proatividade <br> <br> HABILIDADES TÉCNICAS: <br> 1 - Profissionalismo <br> 2 - Precisão técnica';
  }
  getObjetivos(): string {
    return 'Objetivos dessa semana: Revisar o conteúdo sobre banco de dados e aprender Nest.js';
  }
}
