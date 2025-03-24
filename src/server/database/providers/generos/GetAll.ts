import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IGenero } from "../../models";

export const getAll = async (filter: string): Promise<IGenero[] | Error> => {
  try {
    const result = await Knex(ETableNames.genero)
      .select("*")
      .whereLike("nome", `${filter}%`);

    if (result) return result;

    return new Error("Erro ao consultar os registros.");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao consultar os registros.");
  }
};
