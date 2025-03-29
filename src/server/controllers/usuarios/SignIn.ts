import { Request, Response } from "express";
import { UsuariosProvider } from "../../database/providers/usuarios";
import { IUsuario } from "../../database/models";
import { validation } from "../../shared/middlewares/Validation";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { JWTService, PasswordCrypto } from "../../shared/services";

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

  const passwordMatch = await PasswordCrypto.verifyPassword(
    senha,
    result.senha,
  );
  if (!passwordMatch) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: "Email ou senha inválidos." },
    });
    return;
  } else {
    const acessToken = JWTService.sign({ uid: result.id });

    if (acessToken === "JWT_SECRET_NOT_FOUND") {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: { default: "Erro ao gerar o token de acesso." },
      });
      return;
    }

    res.status(StatusCodes.OK).json({ acessToken });
    return;
  }
};
