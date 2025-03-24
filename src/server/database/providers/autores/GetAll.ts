import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IAutor } from "../../models";

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
): Promise<IAutor[] | Error> => {
  try {
    const result = await Knex(ETableNames.autor)
      .select("*")
      .whereLike("nome", `${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (result) return result;

    return new Error("Erro ao consultar os registros.");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao consultar os registros.");
  }
};
