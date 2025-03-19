import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { AnySchema, ObjectSchema, ValidationError } from "yup";

type TProperty = "body" | "query" | "params" | "header";

type TGetSchema = <T extends object>(
  schema: ObjectSchema<T>,
) => ObjectSchema<T>;

type TAllSchemas = Record<TProperty, AnySchema>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation =
  (getAllSchemas) => async (req, res, next) => {
    const schemas = getAllSchemas((schema) => schema);

    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {
      try {
        schema.validateSync(req[key as TProperty], { abortEarly: false });
      } catch (err) {
        const error = err as ValidationError;
        const errors: Record<string, string> = {};

        error.inner.forEach((error) => {
          if (!error.path) return;
          errors[error.path] = error.message;
        });

        errorsResult[key as TProperty] = errors;
      }
    });

    if (Object.entries(errorsResult).length === 0) {
      return next();
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        errors: errorsResult,
      });
    }
  };
