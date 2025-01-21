import { z as zod } from 'zod';

export class AuthLoginDTO {
  email: string;
  password: string;

  private static schema = zod.object({
    email: zod.string().email(),
    password: zod
      .string()
      .min(8, 'Senha deve ter no minimo 8 caracteres')
      .max(20, 'Senha deve ter no maximo 20 caracteres')
      .regex(/[A-Z]/, 'Senha deve ter pelo menos uma letra maiúscula.')
      .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula.')
      .regex(/[0-9]/, 'A senha deve conter pelo menos um número.')
      .regex(
        /[@$!%*?&#]/,
        'A senha deve conter pelo menos um caractere especial (@, $, !, %, *, ?, &, #, etc).',
      ),
  });
  constructor(email: string, password: string) {
    const validate = AuthLoginDTO.schema.parse({ email, password });
    this.email = validate.email;
    this.password = validate.password;
  }
}
