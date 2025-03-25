import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/validation";
import { ILivro } from "../../database/models";
import { LivrosProvider } from "../../database/providers/livros";

interface IBodyProps extends Omit<ILivro, "id"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      titulo: yup.string().required().min(2),
      descricao: yup.string().optional(),
      genero_id: yup.number().required().moreThan(0),
      autor_id: yup.number().required().moreThan(0),
    }),
  ),
}));

export const create = async (req: Request<{}, {}, ILivro>, res: Response) => {
  const result = await LivrosProvider.create(req.body);

  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
    return;
  }

  res.status(StatusCodes.CREATED).json(result);
  return;
};
