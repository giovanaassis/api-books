import { ILivro } from "../../models";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const create = async (
  livro: Omit<ILivro, "id">,
): Promise<number | Error> => {
  try {
    const existedResult = await Knex(ETableNames.livro)
      .select("*")
      .where("titulo", livro.titulo)
      .andWhere("genero_id", livro.genero_id)
      .andWhere("autor_id", livro.autor_id)
      .first();

    if (!existedResult) {
      const [result] = await Knex(ETableNames.livro)
        .insert(livro)
        .returning("id");

      if (typeof result === "object") {
        return result.id;
      } else if (typeof result === "number") {
        return result;
      }
    }

    return new Error("Já existe esse registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao cadastrar um registro.");
  }
};
