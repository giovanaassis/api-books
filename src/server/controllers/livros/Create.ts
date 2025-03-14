import { Request, Response } from "express";
import * as yup from "yup";

interface ILivro {
  titulo: string;
  genero: string;
}

const bodyValidation: yup.Schema<ILivro> = yup.object().shape({
  titulo: yup.string().required().min(2),
  genero: yup.string().required(),
});

export const create = async (req: Request<{}, {}, ILivro>, res: Response) => {
  let validatedData: ILivro | undefined = undefined;
  try {
    validatedData = await bodyValidation.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    const error = err as yup.ValidationError;
    const errors: Record<string, string> = {};

    error.inner.forEach((error) => {
      if (!error.path) return;
      errors[error.path] = error.message;
    });

    res.json({ errors });
  }

  console.log(validatedData);
  res.send("Criado!");
};
