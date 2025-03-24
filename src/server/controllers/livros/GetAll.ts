import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares/validation";
import * as yup from "yup";
import { LivrosProvider } from "../../database/providers/livros";

interface IQueryProps {
  id?: number;
  page?: number;
  limit?: number;
  filter?: string; // acrescentar query para genero e autor
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      id: yup.number().optional().integer().default(0),
      page: yup.number().optional().integer().moreThan(0),
      limit: yup.number().optional().integer().moreThan(0),
      filter: yup.string().optional(),
    }),
  ),
}));

export const getAll = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response,
): Promise<void> => {
  const result = await LivrosProvider.getAll(
    req.query.page || 1,
    req.query.limit || 10,
    req.query.filter || "",
    Number(req.query.id),
  );
  const count = await LivrosProvider.count(req.query.filter);

  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message },
    });
  } else if (count instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: count.message },
    });
  }

  res.setHeader("access-control-expose-headers", "x-total-count");
  res.setHeader("x-total-count", Number(count));

  res.status(StatusCodes.OK).json(result);
};
