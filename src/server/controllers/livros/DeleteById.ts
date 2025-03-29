import { Request, Response } from "express";
import { validation } from "../../shared/middlewares/Validation";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { LivrosProvider } from "../../database/providers/livros";

interface IParamsProps {
  id?: number;
}

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(
    yup.object().shape({
      id: yup.number().required().integer().moreThan(0),
    }),
  ),
}));

export const deleteById = async (
  req: Request<IParamsProps>,
  res: Response,
): Promise<void> => {
  if (!req.params.id) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "O parâmetro 'id' precisa ser informado.",
      },
    });
  }

  const result = await LivrosProvider.deleteById(Number(req.params.id));

  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  res.status(StatusCodes.NO_CONTENT).send();
};
