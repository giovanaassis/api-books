import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares/validation";
import * as yup from "yup";
import { LivrosProvider } from "../../database/providers/livros";

interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      page: yup.number().optional().integer().moreThan(0).default(1),
      limit: yup.number().optional().integer().moreThan(0).default(10),
      filter: yup.string().optional(),
    }),
  ),
}));

export const getAll = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response,
) => {
  console.log(req.query);

  const result = await LivrosProvider.getAll(
    req.query.page,
    req.query.limit,
    req.query.filter,
  );

  res.status(StatusCodes.OK).send(result);
};
