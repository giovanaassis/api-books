import { Request, Response } from "express";
import { validation } from "../../shared/middlewares/Validation";
import * as yup from "yup";
import { AutoresProvider } from "../../database/providers/autores";
import { StatusCodes } from "http-status-codes";

interface IParamsProps {
  id?: number;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    }),
  ),
}));

export const getById = async (req: Request<IParamsProps>, res: Response) => {
  const result = await AutoresProvider.getById(Number(req.params.id));

  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
    return;
  }

  res.status(StatusCodes.OK).json(result);
  return;
};
