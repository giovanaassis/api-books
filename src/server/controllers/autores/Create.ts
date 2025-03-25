import { Request, Response } from "express";
import { IAutor } from "../../database/models";
import { AutoresProvider } from "../../database/providers/autores";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares/validation";
import * as yup from "yup";

interface IBodyProps extends Omit<IAutor, "id"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required(),
    }),
  ),
}));

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response,
) => {
  const result = await AutoresProvider.create(req.body);

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
