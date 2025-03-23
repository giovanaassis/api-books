import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IGenero } from "../../models";

export const getById = async (id: number): Promise<IGenero | Error> => {
  try {
    const result = await Knex(ETableNames.genero)
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
