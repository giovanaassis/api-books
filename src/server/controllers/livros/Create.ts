import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/validation";

interface ILivro {
  titulo: string;
  genero: string;
}

interface IFilter {
  filter?: string;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<ILivro>(
    yup.object().shape({
      titulo: yup.string().required().min(2),
      genero: yup.string().required(),
    }),
  ),
  query: getSchema<IFilter>(
    yup.object().shape({
      filter: yup.string().optional().min(3),
    }),
  ),
}));

export const create = async (req: Request<{}, {}, ILivro>, res: Response) => {
  console.log(req.body);

  res.status(StatusCodes.CREATED).send("Criado!");
};
