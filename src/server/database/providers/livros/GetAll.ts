import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ILivro } from "../../models";

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
  genre: number,
  author: number,
  id = 0,
): Promise<ILivro[] | Error> => {
  try {
    const query = Knex(ETableNames.livro).select("*");

    if (id) query.where("id", id);
    if (genre) query.andWhere("genero_id", genre);
    if (author) query.andWhere("autor_id", author);
    if (filter) query.andWhere("titulo", "like", `%${filter}%`);

    const result = await query.offset((page - 1) * limit).limit(limit);

    return result;
  } catch (error) {
    console.log(error);
    return new Error("Erro ao consultar os registros.");
  }
};
