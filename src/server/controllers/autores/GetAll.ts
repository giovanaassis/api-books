import { Request, Response } from "express";
import { validation } from "../../shared/middlewares/Validation";
import * as yup from "yup";
import { AutoresProvider } from "../../database/providers/autores";
import { StatusCodes } from "http-status-codes";

interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      page: yup.number().optional().integer().moreThan(0),
      limit: yup.number().optional().integer().moreThan(0),
      filter: yup.string().optional(),
    }),
  ),
}));

export const getAll = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response,
) => {
  const result = await AutoresProvider.getAll(
    req.query.page || 1,
    req.query.limit || 10,
    req.query.filter || "",
  );
  const count = await AutoresProvider.count(req.query.filter);

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
