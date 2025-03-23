import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ILivro } from "../../models";

export const update = async (
  livro: Omit<ILivro, "id">,
  id: number,
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.livro)
      .where("id", "=", id)
      .update(livro);

    if (result > 0) return;

    return new Error("Erro ao atualizar um registro.");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar um registro.");
  }
};
