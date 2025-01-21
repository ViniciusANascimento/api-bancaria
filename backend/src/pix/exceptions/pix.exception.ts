export class StatusPixError extends Error {
  constructor(message: string = 'Situação do Pix não pode ser alterada.') {
    super(message);
    this.name = message;
  }
}
export class PixNotFound extends Error {
  constructor(message: string = 'Pix não encontrado.') {
    super(message);
    this.name = message;
  }
}
