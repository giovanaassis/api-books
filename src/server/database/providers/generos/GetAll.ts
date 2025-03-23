import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IGenero } from "../../models";

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
): Promise<IGenero[] | Error> => {
  try {
    const [result] = await Knex(ETableNames.genero)
      .select("*")
      .whereLike("nome", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(Number(limit));

    return result;
  } catch (error) {
    console.log(error);
    return new Error("Erro ao consultar os registros.");
  }
};
