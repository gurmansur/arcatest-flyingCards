export class userStory {
  public id: number = 0;

  public titulo: string = '';

  public descricao: string = '';

  // Aqui talvez eu deveria criar uma classe de DoD pra ficar mais bonitinho.
  // Precisaria do seguinte:
  //    Descricao: string
  //    Status: enum (feito/nao feito - true/false)
  //    Id da user story: number
  //    Ordem (pra saber se é a primeira ou a última coisa a ser feita): number
  public dod: string = '';

  public prazo: string = '';

  // Aqui talvez eu deveria criar um enum de tags?
  public tags: string[] = [''];

  // Por enquanto, vai ser isso daqui mesmo. Não sei como seria com documentos de verdade
  public anexos: string = '';

  // Isso depois vai ser um array de usuarios
  public membros: string[] = [''];

  // Isso depois vai virar um usuario ou um ID de usuário
  public responsavel: string = '';

  // Isso daqui depois tem que virar uma userStory ou algo vazio
  public subtarefas: string[] = [''];

  // Isso depois vai virar uma classe com as seguintes informações:
  //    Id do usuario que comentou - number
  //    Comentário - string
  //    Data e horário do comentário - datetime
  public comentarios: string[] = [''];

  constructor() {
    // responsavel: string // membros: string[], // anexos: string, // tags: string[], // prazo: string, // titulo: string, // id: number,
    // this.id = id;
    // this.titulo = titulo;
    // this.prazo = prazo;
    // this.tags = tags;
    // this.anexos = anexos;
    // this.membros = membros;
    // this.responsavel = responsavel;
  }
}
