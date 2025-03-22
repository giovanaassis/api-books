import { Request, Response } from "express";
import { validation } from "../../shared/middlewares/validation";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { ILivro } from "../../database/models";

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

export const update = (
  req: Request<IParamsProps, {}, IBodyProps>,
  res: Response,
) => {
  console.log(req.body.titulo);
  console.log(req.params);

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Não Implementado");
};
