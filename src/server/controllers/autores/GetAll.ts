import { Request, Response } from "express";
import { validation } from "../../shared/middlewares/validation";
import * as yup from "yup";
import { AutoresProvider } from "../../database/providers/autores";
import { StatusCodes } from "http-status-codes";

interface IQueryProps {
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      filter: yup.string().optional(),
    }),
  ),
}));

export const getAll = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response,
) => {
  const result = await AutoresProvider.getAll(req.query.filter || "");
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
