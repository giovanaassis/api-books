import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IAutor } from "../../models";

export const getById = async (id: number): Promise<IAutor | Error> => {
  try {
    const result = await Knex(ETableNames.autor)
      .select("*")
      .where("id", "=", id)
      .first();

    if (!result) {
      return new Error("Registro não encontrado.");
    } else {
      return result;
    }
  } catch (error) {
    console.log(error);
    return new Error("Erro ao consultar um registro.");
  }
};
