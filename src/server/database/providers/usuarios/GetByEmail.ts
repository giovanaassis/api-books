import { IUsuario } from "../../models";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const getByEmail = async (email: string): Promise<IUsuario | Error> => {
  try {
    const result = await Knex(ETableNames.usuario)
      .select("*")
      .where("email", email)
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
