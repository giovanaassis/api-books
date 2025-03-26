import { Request, Response } from "express";
import { UsuariosProvider } from "../../database/providers/usuarios";
import { IUsuario } from "../../database/models";
import { validation } from "../../shared/middlewares/validation";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";

interface IBodyProps extends Omit<IUsuario, "id" | "nome"> {}

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      email: yup.string().email().required().min(6),
      senha: yup.string().required().min(6),
    }),
  ),
}));

export const signIn = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response,
) => {
  const { email, senha } = req.body;
  const result = await UsuariosProvider.getByEmail(email);

  if (result instanceof Error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: "Email ou senha inválidos." },
    });
    return;
  }

  if (String(senha) !== result.senha) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: "Email ou senha inválidos." },
    });
    return;
  } else {
    res.status(StatusCodes.OK).json({ acessToken: "teste.teste.teste" });
    return;
  }
};
