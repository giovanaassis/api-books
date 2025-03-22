import { ILivro } from "../../models";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const create = async (
  livro: Omit<ILivro, "id">,
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.livro)
      .insert(livro)
      .returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    return new Error("Erro ao cadastrar um registro.");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao cadastrar um registro.");
  }
};
