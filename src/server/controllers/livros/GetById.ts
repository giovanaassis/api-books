import { Request, Response } from "express";
import { validation } from "../../shared/middlewares/validation";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { LivrosProvider } from "../../database/providers/livros";

interface IParamsProps {
  id?: number;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(
    yup.object().shape({
      id: yup.number().required().integer().moreThan(0),
    }),
  ),
}));

export const getById = async (req: Request<IParamsProps>, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "O parâmetro 'id' precisa ser informado.",
      },
    });
  }

  const result = await LivrosProvider.getById(req.params.id);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  res.status(StatusCodes.OK).send(result);
};
