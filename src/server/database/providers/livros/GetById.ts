import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ILivro } from "../../models";

export const getById = async (id: number): Promise<ILivro | Error> => {
  try {
    const result = await Knex(ETableNames.livro)
      .select("*")
      .where("id", "=", id)
      .first();

    if (result) return result;

    return new Error("Erro ao consultar um registro.");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao consultar um registro.");
  }
};
