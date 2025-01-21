export class Unauthorized extends Error {
  constructor(message = 'Credenciais Inválidas') {
    super(message);
    this.name = message;
  }
}
export class UserExists extends Error {
  constructor(message = 'Usuario já cadastrado') {
    super(message);
    this.name = message;
  }
}
export class ClientNotFound extends Error {
  constructor(message: string = 'Usuario não encontrado.') {
    super(message);
    this.name = message;
  }
}
