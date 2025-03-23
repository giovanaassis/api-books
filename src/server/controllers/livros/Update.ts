import { Request, Response } from "express";
import { validation } from "../../shared/middlewares/validation";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { ILivro } from "../../database/models";
import { LivrosProvider } from "../../database/providers/livros";

interface IBodyProps extends Omit<ILivro, "id"> {}

interface IParamsProps {
  id?: number;
}

export const updateValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      titulo: yup.string().required().min(2),
      descricao: yup.string().optional(),
      genero_id: yup.number().required().moreThan(0),
      autor_id: yup.number().required(),
    }),
  ),
  params: getSchema<IParamsProps>(
    yup.object().shape({
      id: yup.number().required().integer().moreThan(0),
    }),
  ),
}));

export const update = async (
  req: Request<IParamsProps, {}, IBodyProps>,
  res: Response,
): Promise<void> => {
  if (!req.params.id) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "O parâmetro 'id' precisa ser informado.",
      },
    });
  }

  const result = await LivrosProvider.update(req.body, Number(req.params.id));

  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  res.status(StatusCodes.NO_CONTENT).json(result);
};
