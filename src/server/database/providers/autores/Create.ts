import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IAutor } from "../../models";

export const create = async (
  nomeDoAutor: Omit<IAutor, "id">,
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.autor)
      .insert(nomeDoAutor)
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
