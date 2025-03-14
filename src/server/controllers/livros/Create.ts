import { Request, Response } from "express";
import * as yup from "yup";

interface ILivro {
  titulo: string;
}

const bodyValidation: yup.Schema<ILivro> = yup.object().shape({
  titulo: yup.string().required().min(2),
});

export const create = async (req: Request<{}, {}, ILivro>, res: Response) => {
  let validatedData: ILivro | undefined = undefined;
  try {
    validatedData = await bodyValidation.validate(req.body);
  } catch (err) {
    const error = err as yup.ValidationError;

    res.json({
      errors: {
        default: error.message,
      },
    });
  }

  console.log(validatedData);
  res.send("Criado!");
};
